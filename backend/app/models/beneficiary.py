from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey,
    TIMESTAMP
)

from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database import Base


class Beneficiary(Base):
    __tablename__ = "beneficiaries"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    name = Column(String(100), nullable=False)

    account_number = Column(
        String(20),
        nullable=False
    )

    bank_name = Column(
        String(100),
        nullable=False
    )

    routing_number = Column(String(50))

    created_at = Column(
        TIMESTAMP,
        server_default=func.now()
    )

    # Relationship
    user = relationship(
        "User",
        back_populates="beneficiaries"
    )