
CREATE TABLE IF NOT EXISTS apartments(
    id SERIAL PRIMARY KEY,
    apartment_indication INT NOT NULL CHECK(apartment_indication >0),
    building_id INT NOT NULL,
    apartment_size REAL NOT NULL CHECK( apartment_size>0),
    heating_area REAL CHECK( heating_area>0),
    floor INT NOT NULL CHECK( floor>=0),
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP
    CHECK (((heating_area IS NULL) = 't') OR (apartment_size >= heating_area))
);
