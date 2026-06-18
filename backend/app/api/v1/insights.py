from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from datetime import datetime

from app.database import get_db
# Assuming there is a get_current_user dependency to get authenticated user
# For now, we will mock or accept user_id as a parameter if not available
# from app.api.deps import get_current_user

from app.services import analytics_service
from app.services import llm_service

router = APIRouter(tags=["insights"])

# Dummy dependency for demonstration, replace with actual auth
def get_current_user_mock():
    return {"id": 1}

@router.get("/summary/{year}/{month}")
def get_monthly_summary(
    year: int, 
    month: int, 
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user_mock)
):
    """Get the natural language financial summary for a given month and year."""
    try:
        summary = analytics_service.get_monthly_summary(db, current_user["id"], month, year)
        if not summary:
            raise HTTPException(status_code=404, detail="No data available for this month.")
        
        return {
            "month": month,
            "year": year,
            "total_income": summary.total_income,
            "total_expenses": summary.total_expenses,
            "net_savings": summary.net_savings,
            "summary_text": summary.summary_text
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/spending-categories/{year}/{month}")
def get_spending_categories(
    year: int, 
    month: int, 
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user_mock)
):
    """Get spending categorized with AI insights."""
    try:
        result = analytics_service.get_spending_categories(db, current_user["id"], month, year)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/health-score/{year}/{month}")
def get_health_score(
    year: int, 
    month: int, 
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user_mock)
):
    """Get financial health score and assessment."""
    try:
        result = analytics_service.calculate_financial_health(db, current_user["id"], month, year)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/savings-recommendations/{year}/{month}")
def get_savings_recommendations(
    year: int, 
    month: int, 
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user_mock)
):
    """Get AI generated savings recommendations."""
    try:
        recommendation = analytics_service.get_savings_recommendations(db, current_user["id"], month, year)
        return {"recommendation": recommendation}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/transaction-explanation/{transaction_id}")
def explain_transaction(
    transaction_id: int, 
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user_mock)
):
    """Explain a specific transaction using AI."""
    from app.models.transaction import Transaction
    txn = db.query(Transaction).filter(Transaction.id == transaction_id).first()
    
    if not txn:
        raise HTTPException(status_code=404, detail="Transaction not found")
        
    # Mock recurring check
    is_recurring = "subscription" in (txn.description or "").lower()
    
    explanation = llm_service.generate_transaction_explanation(
        amount=float(txn.amount),
        description=txn.description or "No description",
        is_recurring=is_recurring
    )
    
    return {"transaction_id": transaction_id, "explanation": explanation}
