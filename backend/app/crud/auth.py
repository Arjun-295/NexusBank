from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.auth import UserCreate
from app.crud.accounts import create_default_account
from app.security import get_password_hash, verify_password


def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def get_user_by_phone(db:Session, phone:str):
    return db.query(User).filter(User.phone == phone).first()

def get_user_by_id(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()


def create_user(db: Session, user_in: UserCreate):
    user = User(
        email=user_in.email,
        password_hash=get_password_hash(user_in.password),
        first_name=user_in.first_name,
        last_name=user_in.last_name,
        phone=user_in.phone,
        role="customer",
        status="active",
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    create_default_account(user.id, db)

    return user


def authenticate_user(db: Session, email: str, password: str):
    user = get_user_by_email(db, email)
    if not user:
        return None
    if not verify_password(password, user.password_hash):
        return None
    return user