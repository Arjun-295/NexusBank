from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.auth import UserCreate, UserRead, Token, LoginRequest
from app.crud.auth import get_user_by_email, create_user, get_user_by_phone
from app.security import verify_password, create_access_token
from app.config import ACCESS_TOKEN_EXPIRE_MINUTES
from datetime import timedelta

router = APIRouter(prefix="/auth", tags=["auth"])

@router.get("/register")
def res():
    return {"message": "This is register which is working fine"}

@router.post("/register", response_model=UserRead)
def register(user_in: UserCreate, db: Session = Depends(get_db)):
    if get_user_by_email(db, user_in.email):
        raise HTTPException(status_code=400, detail="Email already registered")
    if get_user_by_phone(db, user_in.phone):
        raise HTTPException(
            status_code=400,
            detail="Phone number already registered"
        )
    return create_user(db, user_in)

@router.post("/login", response_model=Token)
def login(credentials: LoginRequest, db: Session = Depends(get_db)):
    user = get_user_by_email(db, credentials.email)
    if not user or not verify_password(credentials.password, user.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    access_token_expiry = timedelta(ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token({"sub": user.email}, access_token_expiry)
    return {"access_token": access_token, "token_type": "bearer"}