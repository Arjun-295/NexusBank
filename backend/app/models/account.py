from sqlalchemy import (
    Column,
    Integer,
    String,
    DECIMAL,
    ForeignKey,
    TIMESTAMP
)

from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database import Base


class Account(Base):
    __tablename__ = "accounts"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    account_number = Column(
        String(20),
        unique=True,
        nullable=False
    )

    account_type = Column(String(20))

    balance = Column(
        DECIMAL(15, 2),
        default=0
    )

    currency = Column(String(10), default="INR")

    status = Column(String(20))

    pin = Column(String(255), nullable=True)

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
    user = relationship(
        "User",
        back_populates="accounts"
    )

    transactions_sent = relationship(
        "Transaction",
        foreign_keys="[Transaction.source_account_id]"
    )

    transactions_received = relationship(
        "Transaction",
        foreign_keys="[Transaction.destination_account_id]"
    )