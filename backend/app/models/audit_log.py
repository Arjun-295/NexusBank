from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey,
    TIMESTAMP
)

from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from sqlalchemy.dialects.postgresql import JSONB

from app.database import Base


class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(Integer, primary_key=True, index=True)

    admin_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    action = Column(
        String(100),
        nullable=False
    )

    target_id = Column(Integer)

    details = Column(JSONB)

    created_at = Column(
        TIMESTAMP,
        server_default=func.now()
    )

    # Relationship
    admin = relationship(
        "User",
        back_populates="audit_logs"
    )