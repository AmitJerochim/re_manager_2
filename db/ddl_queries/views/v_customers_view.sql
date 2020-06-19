
CREATE VIEW v_customers AS( SELECT
    id,
    first_name,
    last_name,
    care_of,
    street,
    street_nr,
    post_code,
    city,
    is_owner,
    is_tenant,
    iban,
    bic,
    account_owner
    FROM customers WHERE (deleted_at IS NULL)='t'
);
