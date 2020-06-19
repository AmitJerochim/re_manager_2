
ALTER TABLE rented ADD CONSTRAINT fk_rented_ref_on_apartments FOREIGN KEY (apartment_id) REFERENCES apartments(id) ON DELETE CASCADE ON UPDATE CASCADE;