from app.models.user import User
from sqlalchemy.orm import Session
from app.schemas.auth import UserCreate, UserRead, Token, LoginRequest
from fastapi import APIRouter, Depends, HTTPException, status
from app.database import get_db


def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

result = get_user_by_email(db=Depends(get_db), email='jagan@gmail.com')
print(result)