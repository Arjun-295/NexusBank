import random
import uuid
from datetime import datetime, timedelta
from app.database import SessionLocal
from app.models.user import User
from app.models.account import Account
from app.models.transaction import Transaction
from app.models.beneficiary import Beneficiary
from app.models.audit_log import AuditLog
from app.models.insights import MonthlySummary, FinancialHealthScore, TransactionCategory

def seed_data():
    db = SessionLocal()

    # 1. Ensure user ID 1 exists
    user = db.query(User).filter(User.id == 1).first()
    if not user:
        user = User(
            id=1,
            email="testuser@omnibank.com",
            password_hash="fakehash",
            role="customer",
            first_name="Test",
            last_name="User",
            phone="1234567890",
            status="active"
        )
        db.add(user)
        db.commit()
        db.refresh(user)
        print("Created User ID 1.")
    else:
        print("User ID 1 already exists.")

    # 2. Ensure an account for User 1 exists
    account = db.query(Account).filter(Account.user_id == 1).first()
    if not account:
        account = Account(
            user_id=1,
            account_number="ACCT-10001",
            account_type="savings",
            balance=100000.00,
            currency="INR",
            status="active"
        )
        db.add(account)
        db.commit()
        db.refresh(account)
        print("Created Account for User 1.")
    else:
        print("Account for User 1 already exists.")

    # Ensure an external account exists for receiving/sending money
    ext_account = db.query(Account).filter(Account.id == 9999).first()
    if not ext_account:
        ext_user = User(
            id=9999, email="ext@omnibank.com", password_hash="hash", role="customer",
            first_name="External", last_name="Entity", phone="0987654321", status="active"
        )
        db.add(ext_user)
        db.commit()
        
        ext_account = Account(
            id=9999, user_id=9999, account_number="EXT-9999", account_type="checking",
            balance=9999999.00, currency="INR", status="active"
        )
        db.add(ext_account)
        db.commit()

    # 3. Add random transactions for June 2026
    print("Generating 100 random transactions for June 2026...")
    categories_merchants = [
        ("Zomato Food Delivery", "withdrawal", random.randint(300, 1500)),
        ("Swiggy Order", "withdrawal", random.randint(200, 1000)),
        ("Amazon India Shopping", "withdrawal", random.randint(1000, 5000)),
        ("Flipkart Purchase", "withdrawal", random.randint(800, 4000)),
        ("Uber Ride", "withdrawal", random.randint(150, 600)),
        ("Ola Cabs", "withdrawal", random.randint(100, 500)),
        ("Netflix Subscription", "withdrawal", 649),
        ("Spotify Premium", "withdrawal", 119),
        ("Electricity Bill Board", "withdrawal", random.randint(800, 2000)),
        ("Airtel Mobile Recharge", "withdrawal", random.randint(299, 799)),
        ("Salary Deposit Company", "deposit", random.randint(50000, 90000)),
        ("Freelance Payment", "deposit", random.randint(10000, 30000)),
        ("Refund Amazon", "deposit", random.randint(500, 2000)),
    ]

    # June 2026 range
    start_date = datetime(2026, 6, 1)
    end_date = datetime(2026, 6, 28)
    time_between_dates = end_date - start_date
    days_between_dates = time_between_dates.days

    for _ in range(100):
        merchant, t_type, amount = random.choice(categories_merchants)
        random_number_of_days = random.randrange(days_between_dates)
        random_date = start_date + timedelta(days=random_number_of_days)
        
        # Give some variance to the amount
        if t_type == "withdrawal":
            final_amount = amount + random.randint(-50, 50)
            if final_amount < 10:
                final_amount = amount
            source_id = account.id
            dest_id = ext_account.id
        else:
            final_amount = amount + random.randint(-500, 500)
            source_id = ext_account.id
            dest_id = account.id

        txn = Transaction(
            source_account_id=source_id,
            destination_account_id=dest_id,
            type=t_type,
            amount=final_amount,
            status="completed",
            reference_number=str(uuid.uuid4())[:20],
            description=merchant,
            created_at=random_date
        )
        db.add(txn)
    
    db.commit()
    print("Database seeding completed.")

if __name__ == "__main__":
    seed_data()
