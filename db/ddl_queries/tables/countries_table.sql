CREATE TABLE IF NOT EXISTS countries(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL CHECK( ( name ~ '^(Ü|Ö|Ä|[A-Z])[a-zßäöü]+(([-[:space:]](Ü|Ö|Ä|[A-Z])[a-züöäß]+)*)?$')='t'),
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP
);
