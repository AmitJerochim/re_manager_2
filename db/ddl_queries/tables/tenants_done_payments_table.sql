
CREATE TABLE IF NOT EXISTS tenants_done_payments(
    id SERIAL PRIMARY KEY,
    rented_id INT NOT NULL,
    amount REAL NOT NULL CHECK( amount > 0),
    received_on DATE NOT NULL CHECK( received_on <= NOW()::DATE),
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP
);
