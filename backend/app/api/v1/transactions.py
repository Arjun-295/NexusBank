from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.security import get_current_user
from app.models.user import User
from app.crud.transactions import get_transactions_by_user, withdraw_transactions, create_transfer
from app.schemas.transaction import TransferRequest

router = APIRouter(prefix="/transactions", tags=["transactions"])

@router.get("/get_transactions")
def get_transactions(
    limit: int = 50,
    offset: int = 0,
    start_date: str = None,
    end_date: str = None,
    tx_type: str = None,
    search: str = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if limit < 1 or limit > 1000:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Limit must be between 1 and 1000"
        )
    if offset < 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Offset value must be greater that 0"
        )
    try:
        txs = get_transactions_by_user(current_user.email, db, limit, offset, start_date, end_date, tx_type, search)
        
        if txs.get("error"):
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Database error: {txs["error"]}"
            )

        return {
            "count": len(txs["transactions"]), 
            "total_count": txs["total_count"], 
            "transactions": txs["transactions"]
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal Server Error Occured"
        )

@router.get("/recent_withdraws")
def recent_withdraws(
    limit: int = 3,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if limit < 1 or limit > 1000:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Limit must be between 1 and 1000"
        )
    try:
        txs = withdraw_transactions(current_user.email, db, limit)
        
        if txs.get("error"):
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Database error: {txs["error"]}"
            )

        return {"count": len(txs["transactions"]), "withdraw_transactions": txs["transactions"]}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal Server Error Occured"
        )

@router.post("/transfer")
def transfer_money(
    transfer_request: TransferRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    try:
        result = create_transfer(current_user, transfer_request, db)
        if result.get("error"):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=result["error"]
            )
        return {"message": "Transfer successful", "transaction": result["transaction"]}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal Server Error Occurred"
        )