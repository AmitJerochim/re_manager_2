
CREATE VIEW v_owned_by AS( SELECT 
    id,
    apartment_id,
    owner_id,
    current_owner,
    purchasing_date,
    selling_date
FROM owned_by WHERE(deleted_at IS NULL)='t');
