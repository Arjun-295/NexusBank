from sqlalchemy import (
    Column,
    Integer,
    String,
    DECIMAL,
    ForeignKey,
    TIMESTAMP,
    Text,
    Float
)
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base


class MonthlySummary(Base):
    __tablename__ = "monthly_summaries"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    month = Column(Integer, nullable=False)
    year = Column(Integer, nullable=False)
    total_income = Column(DECIMAL(15, 2), default=0)
    total_expenses = Column(DECIMAL(15, 2), default=0)
    net_savings = Column(DECIMAL(15, 2), default=0)
    summary_text = Column(Text, nullable=False)
    
    created_at = Column(TIMESTAMP, server_default=func.now())
    updated_at = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now())

    user = relationship("User")


class FinancialHealthScore(Base):
    __tablename__ = "financial_health_scores"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    score = Column(Integer, nullable=False) # 0-100
    month = Column(Integer, nullable=False)
    year = Column(Integer, nullable=False)
    assessment_text = Column(Text, nullable=False)

    created_at = Column(TIMESTAMP, server_default=func.now())

    user = relationship("User")


class TransactionCategory(Base):
    __tablename__ = "transaction_categories"

    id = Column(Integer, primary_key=True, index=True)
    transaction_id = Column(Integer, ForeignKey("transactions.id"), nullable=False, unique=True)
    category_name = Column(String(100), nullable=False) # Food, Travel, etc.
    confidence_score = Column(Float, nullable=True) # AI classification confidence
    
    created_at = Column(TIMESTAMP, server_default=func.now())

    transaction = relationship("Transaction")
