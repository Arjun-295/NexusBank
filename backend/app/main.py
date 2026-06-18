from fastapi import FastAPI
from app.database import engine, Base
from app.api.v1.users import router as users_router
from app.api.v1.auth import router as auth_router
from app.api.v1.accounts import router as account_router
from app.api.v1.transactions import router as transactions_router
from fastapi.middleware.cors import CORSMiddleware


from app.models.user import User
from app.models.audit_log import AuditLog
from app.models.beneficiary import Beneficiary
from app.models.transaction import Transaction
from app.models.account import Account
from app.models.insights import MonthlySummary, FinancialHealthScore, TransactionCategory

app = FastAPI()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_origin_regex="https://.*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create table
Base.metadata.create_all(bind=engine)

app.include_router(users_router)
app.include_router(auth_router, prefix="/api")
app.include_router(account_router, prefix="/api")
app.include_router(transactions_router, prefix="/api")
from app.api.v1.insights import router as insights_router
from app.api.v1.chat import router as chat_router

app.include_router(insights_router, prefix="/api/insights")
app.include_router(chat_router, prefix="/api/chat")

@app.get("/")
def root():
    return {"message": "Banking API Running"}