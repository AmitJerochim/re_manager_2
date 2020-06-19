use testdb;
CREATE TABLE IF NOT EXISTS event_logs(
    id SERIAL PRIMARY KEY,
    event_type VARCHAR(255),
    trigger_name VARCHAR(255),
    procedure_name VARCHAR(255),
    affected_table VARCHAR(255),
    affected_row INT,
    logging_time TIMESTAMP,
    created_at TIMESTAMP
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP
);
