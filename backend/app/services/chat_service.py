from sqlalchemy.orm import Session
from sqlalchemy import extract, and_
from datetime import datetime, timedelta
from app.models.transaction import Transaction
from app.models.account import Account
import json
from langchain_community.llms import Ollama
from langchain_core.prompts import PromptTemplate

# Initialize Ollama LLM
llm = Ollama(model="llama3.2:latest")

def get_recent_transactions_context(db: Session, user_id: int, months: int = 3):
    """Fetches the user's transactions from the last N months and formats as text."""
    accounts = db.query(Account).filter(Account.user_id == user_id).all()
    account_ids = [acc.id for acc in accounts]

    if not account_ids:
        return "No accounts found for user."

    end_date = datetime.now()
    start_date = end_date - timedelta(days=months * 30)

    transactions = db.query(Transaction).filter(
        and_(
            Transaction.created_at >= start_date,
            Transaction.created_at <= end_date,
            (Transaction.source_account_id.in_(account_ids) | Transaction.destination_account_id.in_(account_ids)),
            Transaction.status == 'completed'
        )
    ).order_by(Transaction.created_at.desc()).all()

    if not transactions:
        return "No transactions found in the last 3 months."

    # Format transactions to reduce token usage
    tx_list = []
    for tx in transactions:
        tx_type = "Expense" if tx.source_account_id in account_ids else "Income"
        tx_list.append(f"- {tx.created_at.strftime('%Y-%m-%d')}: {tx_type} of ₹{tx.amount} ({tx.description})")

    return "\n".join(tx_list)

def process_chat_message(db: Session, user_id: int, message: str, history: list):
    """Processes a user message and returns the AI response."""
    
    # Get transaction context
    context = get_recent_transactions_context(db, user_id, months=3)
    
    # Format history
    history_text = ""
    if history:
        for msg in history:
            role = "User" if msg.get("role") == "user" else "Assistant"
            history_text += f"{role}: {msg.get('content')}\n"
            
    prompt = PromptTemplate(
        input_variables=["context", "history", "message"],
        template="""You are an AI financial assistant for Omni Bank.
You help the user understand their finances and transactions.
Be concise, helpful, and polite. Only use the provided transaction data to answer questions about their account.
If the user asks something outside the scope of their banking or the provided data, politely inform them you can only assist with their financial data.

Recent Transactions (Last 3 Months):
{context}

Chat History:
{history}

User: {message}
Assistant:"""
    )
    
    formatted_prompt = prompt.format(context=context, history=history_text, message=message)
    response = llm.invoke(formatted_prompt)
    
    return response.strip()
