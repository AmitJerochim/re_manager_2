
CREATE VIEW v_rented AS( SELECT
    id,
    apartment_id,
    tenant_id,
    current_tenant,
    beginning_rental_period,
    end_rental_period
    FROM rented WHERE (deleted_at IS NULL)='t'
);
