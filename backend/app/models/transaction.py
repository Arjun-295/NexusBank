from sqlalchemy import (
    Column,
    Integer,
    String,
    DECIMAL,
    ForeignKey,
    TIMESTAMP,
)
from decimal import Decimal
from sqlalchemy.orm import Mapped, mapped_column

from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from sqlalchemy.dialects.postgresql import JSONB

from app.database import Base


class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)

    source_account_id = Column(
        Integer,
        ForeignKey("accounts.id"),
        nullable=True
    )

    destination_account_id = Column(
        Integer,
        ForeignKey("accounts.id"),
        nullable=True
    )

    type = Column(String(20), nullable=False)

    amount = Column(
        DECIMAL(15, 2),
        nullable=False
    )

    status = Column(String(50), nullable=False)
    
    risk_level = Column(String(50), default="Normal")

    reference_number = Column(
        String(100),
        unique=True,
        nullable=False
    )

    description = Column(String)

    external_destination_details = Column(JSONB)

    created_at = Column(
        TIMESTAMP,
        server_default=func.now()
    )

    updated_at = Column(
        TIMESTAMP,
        server_default=func.now(),
        onupdate=func.now()
    )

    # Relationships
    source_account = relationship(
        "Account",
        foreign_keys=[source_account_id],
        back_populates="transactions_sent"
    )

    destination_account = relationship(
        "Account",
        foreign_keys=[destination_account_id],
        back_populates="transactions_received"
    )
