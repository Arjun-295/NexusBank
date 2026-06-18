from fastapi import HTTPException, status, APIRouter, Depends, Body
from sqlalchemy.orm import Session
from app.database import get_db
from app.crud.accounts import get_balance, get_transactions
from app.schemas.user import UserBase
from app.models.user import User
from app.schemas.account import AccountCreateRequest, PinChangeRequest
from app.crud.accounts import get_account_details, deposite_amount, withdraw_amount, create_account, change_account_pin
from app.security import get_current_user

router = APIRouter(prefix="/account", tags=["account"])

@router.post("/total_balance")
def show_balance(user_in: UserBase, db: Session = Depends(get_db)):
    return get_balance(user_in.email, db)

@router.post("/check_user")
def check_user(user_in: UserBase, db: Session = Depends(get_db)):
    email = user_in.email.strip().lower()  # Normalize email
    user = db.query(User).filter(User.email.ilike(email)).first()  # Case-insensitive
    if not user:
        return {"error": "User not found", "searched_email": email}
    return {
        "user_id": user.id, 
        "email": user.email,
        "email_received": user_in.email
    }

@router.get("/account_details")
def account_details(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    result = get_account_details(db, current_user.email)
    if not result:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User Not Found"
        )
    return result

@router.post('/deposit')
def deposit(
    amount: float = Body(..., description="Amount to deposit"),
    account_id: int = Body(..., description="Account ID"),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    try:
        result = deposite_amount(db, current_user.email, amount, account_id)
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc)
        )
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unable to complete deposit"
        )
    if not result:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Account not found",
        )
    return result


@router.post('/withdraw')
def withdraw(
    amount: float = Body(..., description="Amount to withdraw"),
    account_id: int = Body(..., description="Account ID"),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    try:
        result = withdraw_amount(db, current_user.email, amount, account_id)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc))
    except Exception:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Unable to complete withdrawal")

    if not result:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Account not found")

    return result

@router.post('/create')
def create_new_account(
    request: AccountCreateRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    try:
        account = create_account(db, current_user, request.account_type, request.pin)
        return {"message": "Account created successfully", "account_id": account.id}
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Unable to create account")

@router.post('/change_pin')
def change_pin(
    request: PinChangeRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    try:
        result = change_account_pin(db, current_user, request.account_id, request.old_pin, request.new_pin)
        if result.get("error"):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=result["error"])
        return result
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Unable to change PIN")