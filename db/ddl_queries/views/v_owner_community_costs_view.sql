
CREATE VIEW v_owner_community_costs AS( SELECT 
    id,
    owner_community_id,
    costs,
    year,
    allocatable,
    distributor_key,
    building_cost_type_id
FROM owner_community_costs WHERE (deleted_at IS NULL)='t');
