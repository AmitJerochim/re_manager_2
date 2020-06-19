
CREATE VIEW v_owner_communities AS( SELECT 
    id,
    name
FROM owner_communities WHERE(deleted_at IS NULL)='t');
