CREATE TABLE users (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username VARCHAR(255),
    hashed_pwd BYTEA,
    created_at TIMESTAMP,
    updated_at TIMESTAMP DEFAULT NULL
);

CREATE TABLE budgets (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    creator_id INT REFERENCES users(id),
    alias VARCHAR(255),
    created_at TIMESTAMP,
    updated_at TIMESTAMP DEFAULT NULL
);

CREATE TABLE budget_members (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    budget_id INT REFERENCES budgets(id),
    user_id INT REFERENCES users(id),
    is_member BIT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP DEFAULT NULL
);

CREATE TABLE categories (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    alias VARCHAR(255),
    description VARCHAR(255),
    created_at TIMESTAMP,
    updated_at TIMESTAMP DEFAULT NULL
);

CREATE TABLE transactions (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    budget_id INT REFERENCES budgets(id),
    user_id INT REFERENCES users(id),
    amount NUMERIC(14,2),
    execution_date TIMESTAMP,
    category_id int REFERENCES categories(id),
    created_at TIMESTAMP,
    updated_at TIMESTAMP NOT NULL
);

CREATE TABLE budget_requests (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    requested_buget_id INT REFERENCES budgets(id),
    requested_user_id INT REFERENCES users(id),
    is_request_answered BIT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

