
CREATE TABLE IF NOT EXISTS tenants_planned_payments(
    id SERIAL PRIMARY KEY,
    rented_id INT NOT NULL,
    amount REAL NOT NULL CHECK( amount > 0),
    beginning_date DATE NOT NULL,
    ending_date DATE,
    period VARCHAR(255) NOT NULL CHECK(period IN ('yearly', 'monthly', 'weekly', 'once')),
    payment_type VARCHAR(255) NOT NULL CHECK(payment_type IN ('operation_costs', 'net_cold_rent')),
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP
    CHECK( (ending_date IS NULL)='t' OR (beginning_date < ending_date) )
);
