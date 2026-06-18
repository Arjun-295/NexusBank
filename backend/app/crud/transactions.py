from sqlalchemy import or_, desc
from sqlalchemy.orm import Session
from app.models.user import User
from app.models.account import Account
from app.models.transaction import Transaction
from decimal import Decimal
from typing import cast
import uuid
from app.schemas.transaction import TransferRequest

def get_transactions_by_user(email: str, db: Session, limit: int = 100, offset: int = 0, start_date: str = None, end_date: str = None, tx_type: str = None, search: str = None):
    try:
        email = email.strip().lower()
        user = db.query(User).filter(User.email == email).first()
        if not user:
            return {"error": "User not found", "transactions": []}

        accounts = db.query(Account).filter(Account.user_id == user.id).all()
        account_ids = [a.id for a in accounts]
        if not account_ids:
            return {"error": None, "transactions": []}
        query = db.query(Transaction).filter(
            or_(
                Transaction.source_account_id.in_(account_ids),
                Transaction.destination_account_id.in_(account_ids)
            )
        )

        if start_date:
            query = query.filter(Transaction.created_at >= start_date)
        if end_date:
            query = query.filter(Transaction.created_at <= f"{end_date} 23:59:59")
        if tx_type:
            query = query.filter(Transaction.type == tx_type)
        if search:
            search_pattern = f"%{search}%"
            query = query.filter(
                or_(
                    Transaction.description.ilike(search_pattern),
                    Transaction.reference_number.ilike(search_pattern)
                )
            )

        transactions = (
            query
            .order_by(desc(Transaction.created_at))
            .offset(offset)
            .limit(limit)
            .all()
        )
        result = []
        for t in transactions:
            direction = "out" if t.source_account_id in account_ids else "in"
            result.append({
                "id": t.id,
                "type": t.type,  # Changed from transaction_type
                "amount": float(cast(Decimal, t.amount)),
                "description": t.description,
                "source_account_id": t.source_account_id,
                "destination_account_id": t.destination_account_id,
                "direction": direction,
                "reference_number": t.reference_number,  # Add this
                "created_at": t.created_at,
                "status": t.status,
                "risk_level": getattr(t, 'risk_level', 'Normal'),
            })
        total_count = query.count()

        return {"error": None, "transactions": result, "total_count": total_count}
    except Exception as e:
        return {"error": str(e), "transactions": [], "total_count": 0}

def withdraw_transactions(email: str, db: Session, limit: int = 3):
    try:
        email = email.strip().lower()
        user = db.query(User).filter(User.email == email).first()
        if not user:
            return {"error": "User not found", "withdraw_transactions": []}
        accounts = db.query(Account).filter(Account.user_id == user.id).all()
        account_ids = [a.id for a in accounts]
        if not account_ids:
            return {"error": None, "withdraw_transactions": []}
        transactions = (
            db.query(Transaction)
            .filter(
                or_(
                    Transaction.source_account_id.in_(account_ids),
                    Transaction.destination_account_id.in_(account_ids)
                )
            )
            .where(Transaction.type == "withdrawal")
            .order_by(desc(Transaction.created_at))
            .limit(limit)
        )
        result = []
        for t in transactions:
            direction = "out" if t.source_account_id in account_ids else "in"
            result.append({
                "id": t.id,
                "type": t.type,  # Changed from transaction_type
                "amount": float(cast(Decimal, t.amount)),
                "description": t.description,
                "source_account_id": t.source_account_id,
                "destination_account_id": t.destination_account_id,
                "direction": direction,
                "reference_number": t.reference_number,  # Add this
                "created_at": t.created_at,
                "status": t.status,
                "risk_level": getattr(t, 'risk_level', 'Normal'),
            })
        return {"error": None, "transactions": result}
    except Exception as e:
        return {"error": str(e), "transactions": []}

def create_transfer(current_user: User, transfer_request: TransferRequest, db: Session):
    try:
        # Find the source account using the provided ID
        source_account = db.query(Account).filter(Account.id == transfer_request.source_account_id, Account.user_id == current_user.id).first()
        if not source_account:
            return {"error": "Source account not found"}

        # Find destination account
        dest_account = db.query(Account).filter(Account.account_number == transfer_request.destination_account_number).first()
        if not dest_account:
            return {"error": "Destination account not found"}

        if source_account.id == dest_account.id:
            return {"error": "Cannot transfer to the same account"}

        if transfer_request.amount <= 0:
            return {"error": "Transfer amount must be positive"}

        if source_account.balance < transfer_request.amount:
            return {"error": "Insufficient funds"}

        # Perform the transfer
        source_account.balance -= transfer_request.amount
        dest_account.balance += transfer_request.amount

        # Predict risk using fraud service
        # Step is usually time. Since we don't have step directly, we can use hour of day
        from datetime import datetime
        current_hour = datetime.now().hour
        from app.services.fraud_service import predict_risk

        risk = predict_risk(
            step=current_hour,
            transaction_type="transfer",
            amount=float(transfer_request.amount),
            oldbalanceOrg=float(source_account.balance),
            newbalanceOrig=float(source_account.balance - transfer_request.amount),
            oldbalanceDest=float(dest_account.balance),
            newbalanceDest=float(dest_account.balance + transfer_request.amount)
        )

        # Create the transaction record
        ref_number = f"TRX-{uuid.uuid4().hex[:8].upper()}"
        new_tx = Transaction(
            source_account_id=source_account.id,
            destination_account_id=dest_account.id,
            type="transfer",
            amount=transfer_request.amount,
            status="completed",
            reference_number=ref_number,
            description=transfer_request.description,
            risk_level=risk
        )

        db.add(new_tx)
        db.commit()
        db.refresh(new_tx)

        return {"error": None, "transaction": new_tx}
    except Exception as e:
        db.rollback()
        return {"error": str(e)}