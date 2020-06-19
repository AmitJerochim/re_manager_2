
CREATE TABLE IF NOT EXISTS customers(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL CHECK( (first_name ~ '^(Ü|Ö|Ä|[A-Z])[a-zßäöü]+(([-[:space:]](Ü|Ö|Ä|[A-Z])[a-züöäß]+)*)?$')='t'),
    last_name VARCHAR(255) NOT NULL CHECK( (last_name ~ '^(Ü|Ö|Ä|[A-Z])[a-zßäöü]+(([-[:space:]](Ü|Ö|Ä|[A-Z])[a-züöäß]+)*)?$')='t'),
    care_of VARCHAR(255) CHECK( (care_of IS NULL)='t' OR (care_of ~ '^(Ü|Ö|Ä|[A-Z])[a-zßäöü]+(([-[:space:]](Ü|Ö|Ä|[A-Z])[a-züöäß]+)*)?$')='t'),
    street VARCHAR(255) NOT NULL CHECK( (street ~ '^(Ü|Ö|Ä|[A-Z])[a-zßäöü]+(([-[:space:]](Ü|Ö|Ä|[A-Z])[a-züöäß]+)*)?$')='t'),
    street_nr VARCHAR(255) NOT NULL CHECK( (street_nr ~ '^[1-9][0-9]{0,2}[a-zA-Z]?$')='t'),
    post_code VARCHAR(255) NOT NULL CHECK( (post_code ~ '^[0-9]{5}$')='t'),
    city VARCHAR(255) NOT NULL CHECK( (city ~ '^(Ü|Ö|Ä|[A-Z])[a-zßäöü]+(([-[:space:]](Ü|Ö|Ä|[A-Z])[a-züöäß]+)*)?$')='t'),
    is_owner INT NOT NULL CHECK( is_owner=1 OR is_owner=0),
    is_tenant INT NOT NULL CHECK( is_tenant=1 OR is_tenant=0),
    iban VARCHAR(255),
    bic VARCHAR(255),
    account_owner VARCHAR(255),
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP
);
