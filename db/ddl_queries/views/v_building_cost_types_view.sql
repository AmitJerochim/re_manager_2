
CREATE VIEW v_building_cost_types AS( SELECT
    id,
    designation
    FROM building_cost_types WHERE (deleted_at IS NULL)='t'
);
