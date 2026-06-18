from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from decimal import Decimal

class AccountBase(BaseModel):
    account_number: str
    account_type: str
    currency: str = "INR"

class AccountCreate(AccountBase):
    user_id: int

class AccountUpdate(BaseModel):
    balance: Optional[Decimal] = None
    status: Optional[str] = None

class AccountResponse(AccountBase):
    id: int
    user_id: int
    balace: Decimal
    status: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class AccountCreateRequest(BaseModel):
    account_type: str
    pin: str

class PinChangeRequest(BaseModel):
    account_id: int
    old_pin: str
    new_pin: str