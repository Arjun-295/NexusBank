from langchain_community.llms import Ollama
from langchain_core.prompts import PromptTemplate
import json

# Initialize Ollama LLM
# Assuming ollama is running locally on default port 11434
llm = Ollama(model="llama3.2:latest")

def generate_monthly_summary(income: float, expenses: float, savings: float, month: str, year: str) -> str:
    """Generates a natural language summary of the monthly finances."""
    prompt = PromptTemplate(
        input_variables=["month", "year", "income", "expenses", "savings"],
        template="""You are a helpful and professional banking assistant for Omni Bank.
Generate a concise, 2-3 sentence natural language summary of the user's financial activity for the given month.

Data for {month} {year}:
Total Income (Deposits): ₹{income}
Total Expenses: ₹{expenses}
Net Savings: ₹{savings}

The summary should be easy to understand, encouraging, and mention the specific amounts. Do not include any other text, just the summary.
"""
    )
    formatted_prompt = prompt.format(
        month=month, year=year, income=income, expenses=expenses, savings=savings
    )
    response = llm.invoke(formatted_prompt)
    return response.strip()

def generate_spending_insights(category_totals: dict, previous_month_totals: dict = None) -> str:
    """Generates insights based on spending categories."""
    prompt = PromptTemplate(
        input_variables=["categories", "previous_categories"],
        template="""You are a helpful banking assistant. Analyze the following spending categories for the user.

Current Month Spending:
{categories}

Previous Month Spending:
{previous_categories}

Provide a brief insight (2-3 sentences) identifying the highest spending category and any significant changes compared to the previous month. Do not include any greetings or extra text, just the insight.
"""
    )
    formatted_prompt = prompt.format(
        categories=json.dumps(category_totals, indent=2),
        previous_categories=json.dumps(previous_month_totals or {}, indent=2)
    )
    response = llm.invoke(formatted_prompt)
    return response.strip()

def generate_savings_recommendations(income: float, expenses: float, categories: dict) -> str:
    """Generates personalized savings recommendations."""
    prompt = PromptTemplate(
        input_variables=["income", "expenses", "categories"],
        template="""You are a financial advisor for Omni Bank.
Based on the user's monthly data:
Income: ₹{income}
Expenses: ₹{expenses}
Spending by Category: {categories}

Provide one practical, actionable recommendation to improve their savings. Focus on the highest discretionary spending categories if any. Keep it to 1-2 sentences.
"""
    )
    formatted_prompt = prompt.format(
        income=income, expenses=expenses, categories=json.dumps(categories)
    )
    response = llm.invoke(formatted_prompt)
    return response.strip()

def generate_transaction_explanation(amount: float, description: str, is_recurring: bool) -> str:
    """Explains a specific transaction."""
    prompt = PromptTemplate(
        input_variables=["amount", "description", "recurring_text"],
        template="""You are a helpful banking assistant. Provide a 1-sentence human-readable explanation for this transaction.
Amount: ₹{amount}
Description: {description}
{recurring_text}

Keep the explanation clear and straightforward.
"""
    )
    recurring_text = "This appears to be a recurring payment." if is_recurring else ""
    formatted_prompt = prompt.format(
        amount=amount, description=description, recurring_text=recurring_text
    )
    response = llm.invoke(formatted_prompt)
    return response.strip()

def assess_financial_health(savings_rate: float, expenses: float) -> str:
    """Generates a brief assessment based on financial health."""
    prompt = PromptTemplate(
        input_variables=["savings_rate"],
        template="""You are a financial advisor. The user's savings rate this month is {savings_rate}%.
Provide a very brief (1 sentence) assessment of their financial health based on this rate. (>20% is excellent, 10-20% is good, <10% needs improvement).
"""
    )
    formatted_prompt = prompt.format(savings_rate=round(savings_rate, 2))
    response = llm.invoke(formatted_prompt)
    return response.strip()
