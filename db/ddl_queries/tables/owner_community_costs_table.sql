
CREATE TABLE IF NOT EXISTS owner_community_costs(
    id SERIAL PRIMARY KEY,
    owner_community_id INT NOT NULL,
    costs REAL NOT NULL CHECK(costs > 0),
    year INT NOT NULL CHECK(year > 2010 AND year <2040),
    allocatable INT ,--NOT NULL CHECK(allocatable=1 OR allocatable=0),
    distributor_key VARCHAR(255) NOT NULL,-- CHECK(period IN ('yearly', 'monthly', 'weekly', 'once')),
    building_cost_type_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP
);
