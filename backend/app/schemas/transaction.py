from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from decimal import Decimal

class TransactionBase(BaseModel):
    type: str
    amount: Decimal
    description: Optional[str] = None

class TransactionCreate(TransactionBase):
    source_account_id: Optional[int] = None
    destination_account_id: Optional[int] = None

class TransactionUpdate(BaseModel):
    status: Optional[str] = None

class TransactionResponse(TransactionBase):
    id: int
    source_account_id: Optional[int]
    destination_account_id: Optional[int]
    status: str
    reference_number: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class TransferRequest(BaseModel):
    source_account_id: int
    destination_account_number: str
    amount: Decimal
    description: Optional[str] = None