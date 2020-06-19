
CREATE TABLE IF NOT EXISTS documents(
    id SERIAL PRIMARY KEY,
    rented_id INT NOT NUll, 
    calculation_year INT NOT NULL CHECK(calculation_year > 1950 AND calculation_year <2030),
    revision INT NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP,
    UNIQUE (rented_id, calculation_year, revision, deleted_at)
);
