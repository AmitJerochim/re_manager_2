
CREATE TABLE IF NOT EXISTS owner_communities(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP
);
