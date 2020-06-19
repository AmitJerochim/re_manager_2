
CREATE VIEW v_apartment_costs AS( SELECT
    id,
    apartment_id,
    designation,
    costs,
    period,
    beginning_date,
    ending_date
    FROM apartment_costs WHERE (deleted_at IS NULL)='t'
);
