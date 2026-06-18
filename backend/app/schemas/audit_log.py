from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class AuditLogCreate(BaseModel):
    admin_id: int
    action: str
    target_id: Optional[int] = None
    details: Optional[dict] = None

class AuditLogResponse(AuditLogCreate):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True