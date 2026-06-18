from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class BeneficiaryBase(BaseModel):
    name: str
    account_number: str
    bank_name: str
    routing_number: Optional[str] = None

class BeneficiaryCreate(BeneficiaryBase):
    user_id: int

class BeneficiaryUpdate(BaseModel):
    name: Optional[str] = None
    routing_number: Optional[str] = None

class BeneficiaryResponse(BeneficiaryBase):
    id: int
    user_id: int
    created_at: datetime

    class Config:
        from_attributes = True