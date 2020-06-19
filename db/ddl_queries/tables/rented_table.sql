
CREATE TABLE IF NOT EXISTS rented(
    id SERIAL PRIMARY KEY,
    apartment_id INT NOT NULL,
    tenant_id INT NOT NULL,
    current_tenant INT NOT NULL CHECK( current_tenant=1 OR current_tenant=0),
    beginning_rental_period DATE NOT NULL,
    end_rental_period DATE,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP
    CHECK( end_rental_period > beginning_rental_period)
);
