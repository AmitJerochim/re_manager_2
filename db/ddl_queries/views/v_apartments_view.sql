
CREATE VIEW v_apartments AS( SELECT
    id,
    apartment_indication,
    building_id,
    apartment_size,
    heating_area,
    floor
    FROM apartments WHERE (deleted_at IS NULL)='t'
);
