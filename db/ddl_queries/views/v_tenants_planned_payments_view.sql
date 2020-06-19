
CREATE VIEW v_tenants_planned_payments AS( SELECT
    id,
    rented_id,
    amount,
    beginning_date,
    ending_date,
    period,
    payment_type
    FROM tenants_planned_payments WHERE (deleted_at IS NULL)='t'
);
