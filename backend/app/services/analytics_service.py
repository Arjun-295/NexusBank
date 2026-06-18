from sqlalchemy.orm import Session
from sqlalchemy import extract, func, and_
from datetime import datetime
import calendar
from app.models.transaction import Transaction
from app.models.account import Account
from app.models.insights import MonthlySummary, FinancialHealthScore, TransactionCategory
from app.services import llm_service
from decimal import Decimal

def get_monthly_summary(db: Session, user_id: int, month: int, year: int):
    """Generates or retrieves the monthly financial summary."""
    # Check if cached summary exists
    existing_summary = db.query(MonthlySummary).filter(
        and_(
            MonthlySummary.user_id == user_id,
            MonthlySummary.month == month,
            MonthlySummary.year == year
        )
    ).first()
    
    if existing_summary:
        return existing_summary

    # Get user accounts
    accounts = db.query(Account).filter(Account.user_id == user_id).all()
    account_ids = [acc.id for acc in accounts]

    if not account_ids:
        return None

    # Get transactions for the month
    transactions = db.query(Transaction).filter(
        and_(
            extract('month', Transaction.created_at) == month,
            extract('year', Transaction.created_at) == year,
            (Transaction.source_account_id.in_(account_ids) | Transaction.destination_account_id.in_(account_ids)),
            Transaction.status == 'completed'
        )
    ).all()

    total_income = Decimal('0.0')
    total_expenses = Decimal('0.0')

    for txn in transactions:
        # If the destination account belongs to the user, it's income
        if txn.destination_account_id in account_ids:
            total_income += txn.amount
        # If the source account belongs to the user, it's an expense
        elif txn.source_account_id in account_ids:
            total_expenses += txn.amount

    net_savings = total_income - total_expenses

    month_name = calendar.month_name[month]
    
    # Generate natural language summary using LLM
    summary_text = llm_service.generate_monthly_summary(
        income=float(total_income),
        expenses=float(total_expenses),
        savings=float(net_savings),
        month=month_name,
        year=str(year)
    )

    # Save to database
    new_summary = MonthlySummary(
        user_id=user_id,
        month=month,
        year=year,
        total_income=total_income,
        total_expenses=total_expenses,
        net_savings=net_savings,
        summary_text=summary_text
    )
    db.add(new_summary)
    db.commit()
    db.refresh(new_summary)

    return new_summary

def get_spending_categories(db: Session, user_id: int, month: int, year: int):
    """Categorizes spending and generates insights."""
    # This is a simplified categorization logic for demonstration.
    # In a real app, you might use a rule engine or LLM to categorize every transaction.
    
    accounts = db.query(Account).filter(Account.user_id == user_id).all()
    account_ids = [acc.id for acc in accounts]

    # Only look at expenses
    transactions = db.query(Transaction).filter(
        and_(
            extract('month', Transaction.created_at) == month,
            extract('year', Transaction.created_at) == year,
            Transaction.source_account_id.in_(account_ids),
            Transaction.status == 'completed'
        )
    ).all()

    category_totals = {}
    
    for txn in transactions:
        # Simple keyword-based categorization
        desc = (txn.description or "").lower()
        category = "Other"
        if any(word in desc for word in ['zomato', 'swiggy', 'restaurant', 'cafe', 'food']):
            category = "Food & Dining"
        elif any(word in desc for word in ['amazon', 'flipkart', 'myntra', 'shopping']):
            category = "Shopping"
        elif any(word in desc for word in ['electricity', 'water', 'bill', 'recharge', 'jio', 'airtel']):
            category = "Utilities"
        elif any(word in desc for word in ['uber', 'ola', 'flight', 'irctc', 'petrol']):
            category = "Travel"
        elif any(word in desc for word in ['netflix', 'prime', 'spotify', 'movie', 'pvr']):
            category = "Entertainment"
            
        category_totals[category] = category_totals.get(category, 0) + float(txn.amount)

    # Generate insights
    insights = llm_service.generate_spending_insights(category_totals)
    
    return {
        "categories": category_totals,
        "insights": insights
    }

def calculate_financial_health(db: Session, user_id: int, month: int, year: int):
    """Calculates financial health score based on savings rate."""
    summary = get_monthly_summary(db, user_id, month, year)
    
    if not summary or summary.total_income == 0:
        return {"score": 0, "assessment": "Not enough data to calculate health score."}

    savings_rate = (float(summary.net_savings) / float(summary.total_income)) * 100
    
    # Calculate score (out of 100)
    score = 50 # Base score
    if savings_rate > 20:
        score += 40
    elif savings_rate > 10:
        score += 20
    elif savings_rate > 0:
        score += 10
    else:
        score -= 20 # Penalize negative savings
        
    score = max(0, min(100, score)) # Clamp between 0 and 100

    assessment = llm_service.assess_financial_health(savings_rate, float(summary.total_expenses))

    # Save to db
    health_record = FinancialHealthScore(
        user_id=user_id,
        score=score,
        month=month,
        year=year,
        assessment_text=assessment
    )
    db.add(health_record)
    db.commit()

    return {
        "score": score,
        "assessment": assessment,
        "savings_rate": savings_rate
    }

def get_savings_recommendations(db: Session, user_id: int, month: int, year: int):
    summary = get_monthly_summary(db, user_id, month, year)
    if not summary:
        return "Not enough data."
        
    cats = get_spending_categories(db, user_id, month, year)
    
    recommendation = llm_service.generate_savings_recommendations(
        income=float(summary.total_income),
        expenses=float(summary.total_expenses),
        categories=cats['categories']
    )
    return recommendation
