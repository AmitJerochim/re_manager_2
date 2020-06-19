
CREATE TABLE IF NOT EXISTS buildings(
    id SERIAL PRIMARY KEY,
    street VARCHAR(255) NOT NULL CHECK( (street ~ '^(Ü|Ö|Ä|[A-Z])[a-zßäöü]+(([-[:space:]](Ü|Ö|Ä|[A-Z])[a-züöäß]+)*)?$')='t'),
    street_nr VARCHAR(255) NOT NULL CHECK( (street_nr ~ '^[1-9][0-9]{0,2}[a-zA-Z]?$')='t'),
    post_code VARCHAR(255) NOT NULL CHECK( (post_code ~ '^[0-9]{5}$')='t'),
    city VARCHAR(255) NOT NULL CHECK( (city ~ '^(Ü|Ö|Ä|[A-Z])[a-zßäöü]+(([-[:space:]](Ü|Ö|Ä|[A-Z])[a-züöäß]+)*)?$')='t'),
    total_area REAL NOT NULL CHECK(total_area > 0),
    ground_floor_area REAL NOT NULL CHECK(ground_floor_area > 0),
    business_area REAL NOT NULL CHECK(business_area >= 0),
    number_flats INT NOT NULL CHECK(number_flats > 0),
    year_of_completion INT NOT NULL CHECK(year_of_completion > 1700 AND year_of_completion <2030),
    owner_community_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP
    CHECK(total_area >= business_area AND total_area >=ground_floor_area)
);
 
