
CREATE TABLE IF NOT EXISTS apartment_costs(
    id SERIAL PRIMARY KEY,
    apartment_id INT NOT NULL CHECK(apartment_id >0 ),
    costs REAL NOT NULL CHECK(costs >0 ),
    designation VARCHAR(255) NOT NULL,-- CHECK( (designation ~ '^(Ü|Ö|Ä|[A-Z])[a-zßäöü]+(([-/[:space:]](Ü|Ö|Ä|[A-Z])[a-züöäß]+)*)?$')='t'),
    period VARCHAR(255) NOT NULL CHECK(period IN ('yearly', 'monthly', 'weekly', 'once')),
    beginning_date DATE NOT NULL,
    ending_date DATE,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP
    CHECK((ending_date IS NULL)='t' OR (ending_date > beginning_date))
);
