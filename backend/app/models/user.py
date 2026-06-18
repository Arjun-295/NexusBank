from datetime import datetime
from typing import Optional

from sqlalchemy import Integer, String, TIMESTAMP
from sqlalchemy.sql import func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)

    email: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)

    password_hash: Mapped[str] = mapped_column(String, nullable=False)

    role: Mapped[str] = mapped_column(String(20), nullable=False)

    first_name: Mapped[str] = mapped_column(String(50), nullable=False)

    last_name: Mapped[Optional[str]] = mapped_column(String(50))

    phone: Mapped[str] = mapped_column(String(15), unique=True, nullable=False)

    status: Mapped[str] = mapped_column(String(20), nullable=False)

    created_at: Mapped[Optional[datetime]] = mapped_column(
        TIMESTAMP,
        server_default=func.now()
    )

    updated_at: Mapped[Optional[datetime]] = mapped_column(
        TIMESTAMP,
        server_default=func.now(),
        onupdate=func.now()
    )

    # Relationships
    accounts = relationship("Account", back_populates="user")

    beneficiaries = relationship(
        "Beneficiary",
        back_populates="user"
    )

    audit_logs = relationship(
        "AuditLog",
        back_populates="admin"
    )