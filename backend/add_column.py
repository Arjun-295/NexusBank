from sqlalchemy import create_engine, text

engine = create_engine('postgresql://postgres:postgres@localhost:5432/banking_db')
with engine.connect() as con:
    con.execute(text("ALTER TABLE transactions ADD COLUMN IF NOT EXISTS risk_level VARCHAR(50) DEFAULT 'Normal';"))
    con.commit()
print("Column added.")
