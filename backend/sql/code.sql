-- CREATE DATABASE
CREATE DATABASE banking_db;

-- Connect to database manually in PostgreSQL
-- \c banking_db


---------------------------------------------------
-- USERS TABLE
---------------------------------------------------

CREATE TABLE users (
    id SERIAL PRIMARY KEY,

    email VARCHAR(100) UNIQUE NOT NULL,

    password_hash TEXT NOT NULL,

    role VARCHAR(20)
        CHECK (role IN ('customer', 'admin')),

    first_name VARCHAR(50) NOT NULL,

    last_name VARCHAR(50),

    phone VARCHAR(15) UNIQUE NOT NULL,

    status VARCHAR(20)
        CHECK (status IN ('active', 'pending', 'suspended')),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


---------------------------------------------------
-- ACCOUNTS TABLE
---------------------------------------------------

CREATE TABLE accounts (
    id SERIAL PRIMARY KEY,

    user_id INTEGER NOT NULL,

    account_number VARCHAR(20) UNIQUE NOT NULL,

    account_type VARCHAR(20)
        CHECK (account_type IN ('savings', 'checking', 'business')),

    balance DECIMAL(15,2)
        DEFAULT 0
        CHECK (balance >= 0),

    currency VARCHAR(10) DEFAULT 'INR',

    status VARCHAR(20)
        CHECK (status IN ('active', 'frozen', 'closed')),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_accounts_user
        FOREIGN KEY(user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);


---------------------------------------------------
-- TRANSACTIONS TABLE
---------------------------------------------------

CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,

    source_account_id INTEGER,

    destination_account_id INTEGER,

    type VARCHAR(20)
        CHECK (type IN ('deposit', 'withdrawal', 'transfer')),

    amount DECIMAL(15,2)
        NOT NULL
        CHECK (amount > 0),

    status VARCHAR(20)
        CHECK (status IN ('pending', 'completed', 'failed', 'flagged')),

    reference_number VARCHAR(100)
        UNIQUE NOT NULL,

    description TEXT,

    external_destination_details JSONB,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_source_account
        FOREIGN KEY(source_account_id)
        REFERENCES accounts(id),

    CONSTRAINT fk_destination_account
        FOREIGN KEY(destination_account_id)
        REFERENCES accounts(id)
);


---------------------------------------------------
-- BENEFICIARIES TABLE
---------------------------------------------------

CREATE TABLE beneficiaries (
    id SERIAL PRIMARY KEY,

    user_id INTEGER NOT NULL,

    name VARCHAR(100) NOT NULL,

    account_number VARCHAR(20) NOT NULL,

    bank_name VARCHAR(100) NOT NULL,

    routing_number VARCHAR(50),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_beneficiary_user
        FOREIGN KEY(user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);


---------------------------------------------------
-- AUDIT LOGS TABLE
---------------------------------------------------

CREATE TABLE audit_logs (
    id SERIAL PRIMARY KEY,

    admin_id INTEGER NOT NULL,

    action VARCHAR(100) NOT NULL,

    target_id INTEGER,

    details JSONB,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_admin_user
        FOREIGN KEY(admin_id)
        REFERENCES users(id)
);


---------------------------------------------------
-- INDEXES
---------------------------------------------------

CREATE INDEX idx_users_email
ON users(email);

CREATE INDEX idx_accounts_user_id
ON accounts(user_id);

CREATE INDEX idx_transactions_source
ON transactions(source_account_id);

CREATE INDEX idx_transactions_destination
ON transactions(destination_account_id);

CREATE INDEX idx_transactions_reference
ON transactions(reference_number);