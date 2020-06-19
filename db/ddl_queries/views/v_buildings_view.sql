
CREATE VIEW v_buildings AS( SELECT
    id,
    street,
    street_nr,
    post_code,
    city,
    total_area,
    ground_floor_area,
    business_area,
    number_flats,
    year_of_completion,
    owner_community_id FROM buildings WHERE (deleted_at IS NULL)='t'
);
