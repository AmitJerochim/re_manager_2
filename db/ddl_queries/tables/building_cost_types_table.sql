
CREATE TABLE IF NOT EXISTS building_cost_types(
    id SERIAL PRIMARY KEY,
    designation VARCHAR(255) NOT NULL CHECK( (designation ~ '^(Ü|Ö|Ä|[A-Z])[a-zßäöü]+(([-/[:space:]](Ü|Ö|Ä|[A-Z])[a-züöäß]+)*)?$')='t'),
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP
);
