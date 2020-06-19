
CREATE VIEW v_documents AS( SELECT
    id,
    rented_id,
    calculation_year,
    revision
    FROM documents WHERE (deleted_at IS NULL)='t'
);
