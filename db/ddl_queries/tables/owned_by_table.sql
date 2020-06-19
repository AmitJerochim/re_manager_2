
CREATE TABLE IF NOT EXISTS owned_by(
    id SERIAL PRIMARY KEY,
    apartment_id INT NOT NULL,
    owner_id INT NOT NULL,
    current_owner INT NOT NULL CHECK( current_owner=1 OR current_owner=0),
    purchasing_date DATE NOT NULL,
    selling_date DATE,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP
    CHECK(selling_date > purchasing_date)
);
