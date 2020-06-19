
ALTER TABLE apartments ADD CONSTRAINT fk_apartments_ref_on_buildings FOREIGN KEY (building_id) REFERENCES buildings(id) ON DELETE CASCADE ON UPDATE CASCADE;