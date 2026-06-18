from sqlalchemy.orm import Session
from sqlalchemy import desc
from app.models.user import User
from app.models.account import Account
from app.models.transaction import Transaction
from decimal import Decimal
from typing import cast
import string
import random
from app.security import get_password_hash, verify_password

def get_balance(email: str, db: Session):
    email = email.strip().lower()
    user = db.query(User).filter(User.email == email).first()
    if not user:
        return None
    print(f"User ID: {user.id}, Type: {type(user.id)}")
    accounts = db.query(Account).filter(Account.user_id == user.id).all()
    print(f"Found {len(accounts)} accounts")
    total_balance = sum(
        float(cast(Decimal, account.balance or 0))
        for account in accounts
    )
    return {
        "email": email,
        "total_balance": total_balance,
        "account_count": len(accounts)
    }

def get_transactions(email: str, db: Session, limit:int = 50):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        return []
    transactions = db.query(Transaction).filter(Transaction.user_id == user.id).order_by(desc(Transaction.created_at)).limit(limit).all()
    return [
        {
            "id": t.id,
            "type": t.transaction_type,
            "amount": t.amount,
            "description": t.description,
            "data": t.created_at,
            "status": t.status
        }
        for t in transactions
    ]

def create_default_account(user_id:int, db: Session):
    account_number = generate_account_number()
    account = Account(
        user_id=user_id,
        account_number=account_number,
        account_type="savings",
        balance=0.00,
        currency="INR",
        status="active"
    )
    db.add(account)
    db.commit()
    db.refresh(account)
    return account

def generate_account_number():
    return "".join(random.choices(string.digits, k=12))
    
def get_account_details(db: Session, email: str):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        return None
    accounts = db.query(Account).filter(Account.user_id == user.id).all()
    # db.refresh(Account)
    
    return {
        "user_id": user.id,
        "email": user.email,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "account_count": len(accounts),
        "accounts": [
            {
                "id": acc.id,
                "account_number": acc.account_number,
                "account_type": acc.account_type,
                "balance": float(cast(Decimal, acc.balance or 0)),
                "currency": acc.currency,
                "status": acc.status,
                "created_at": acc.created_at
            }
            for acc in accounts
        ]
    }

def generate_reference_number():
    return "REF" + "".join(random.choices(string.ascii_uppercase + string.digits, k=12))

def deposite_amount(db: Session, email: str, amount: float, account_id: int):
    """
    Deposit amount into the specific account matching account_id.
    Returns dict with updated account and created transaction, or None if user/account not found.
    Raises ValueError for invalid amounts or propagates DB exceptions.
    """
    email = email.strip().lower()
    user = db.query(User).filter(User.email == email).first()
    if not user:
        return None

    # validate amount
    try:
        dec_amount = Decimal(str(amount))
    except Exception:
        raise ValueError("Invalid amount")

    if dec_amount <= 0:
        raise ValueError("Amount must be greater than 0")

    # lock the account row to avoid concurrent writes
    account = db.query(Account).filter(
        Account.user_id == user.id,
        Account.id == account_id
    ).with_for_update().first()

    if not account:
        return None

    try:
        # ensure account.balance is Decimal
        current_balance = cast(Decimal, account.balance) if account.balance is not None else Decimal("0")
        account.balance = current_balance + dec_amount  # type: ignore[assignment]

        # create transaction record (deposit)
        txn = Transaction(
            source_account_id=None,
            destination_account_id=account.id,
            type="deposit",
            amount=dec_amount,
            description=f"Deposit to {account.account_type}",
            status="completed",
            reference_number=generate_reference_number()
        )

        db.add(txn)
        db.add(account)
        db.commit()
        db.refresh(account)
        db.refresh(txn)

        return {
            "account": {
                "id": account.id,
                "account_number": account.account_number,
                "account_type": account.account_type,
                "balance": float(cast(Decimal, account.balance or Decimal("0"))),  # type: ignore[return-value]
                "currency": account.currency,
                "status": account.status
            },
            "transaction": {
                "id": txn.id,
                "type": txn.type,
                "amount": float(cast(Decimal, txn.amount or 0)),
                "reference_number": txn.reference_number,
                "status": txn.status,
                "created_at": txn.created_at
            }
        }
    except Exception:
        db.rollback()
        raise

def withdraw_amount(db: Session, email: str, amount: float, account_id: int):
    """
    Withdraw amount from specific account matching account_id.
    Validates sufficient balance, creates transaction, updates balance atomically.
    Returns dict with updated account and transaction, or None if user/account not found.
    """
    email = email.strip().lower()
    user = db.query(User).filter(User.email == email).first()
    if not user:
        return None

    # validate amount
    try:
        dec_amount = Decimal(str(amount))
    except Exception:
        raise ValueError("Invalid amount")

    if dec_amount <= 0:
        raise ValueError("Amount must be greater than 0")

    # lock the account row to avoid concurrent writes
    account = db.query(Account).filter(
        Account.user_id == user.id,
        Account.id == account_id
    ).with_for_update().first()

    if not account:
        return None

    try:
        current_balance = cast(Decimal, account.balance) if account.balance is not None else Decimal("0")
        if current_balance < dec_amount:
            raise ValueError("Insufficient funds")

        account.balance = current_balance - dec_amount  # type: ignore[assignment]

        txn = Transaction(
            source_account_id=account.id,
            destination_account_id=None,
            type="withdrawal",
            amount=dec_amount,
            description=f"Withdrawal from {account.account_type}",
            status="completed",
            reference_number=generate_reference_number()
        )

        db.add(txn)
        db.add(account)
        db.commit()
        db.refresh(account)
        db.refresh(txn)

        return {
            "account": {
                "id": account.id,
                "account_number": account.account_number,
                "account_type": account.account_type,
                "balance": float(cast(Decimal, account.balance or Decimal("0"))),  # type: ignore[return-value]
                "currency": account.currency,
                "status": account.status
            },
            "transaction": {
                "id": txn.id,
                "type": txn.type,
                "amount": float(cast(Decimal, txn.amount or Decimal("0"))),
                "reference_number": txn.reference_number,
                "status": txn.status,
                "created_at": txn.created_at
            }
        }
    except Exception:
        db.rollback()
        raise

def create_account(db: Session, user: User, account_type: str, pin: str):
    account_number = generate_account_number()
    hashed_pin = get_password_hash(pin)
    account = Account(
        user_id=user.id,
        account_number=account_number,
        account_type=account_type,
        balance=0.00,
        currency="INR",
        status="active",
        pin=hashed_pin
    )
    db.add(account)
    db.commit()
    db.refresh(account)
    return account

def change_account_pin(db: Session, user: User, account_id: int, old_pin: str, new_pin: str):
    account = db.query(Account).filter(Account.id == account_id, Account.user_id == user.id).first()
    if not account:
        return {"error": "Account not found"}
    
    if account.pin and not verify_password(old_pin, account.pin):
        return {"error": "Incorrect old PIN"}

    account.pin = get_password_hash(new_pin)
    db.commit()
    db.refresh(account)
    return {"message": "PIN changed successfully"}

