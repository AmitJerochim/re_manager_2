
CREATE VIEW v_tenants_done_payments AS( SELECT
    id,
    rented_id,
    amount,
    received_on
    FROM tenants_done_payments WHERE (deleted_at IS NULL)='t'
);
