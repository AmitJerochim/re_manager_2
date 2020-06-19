
ALTER TABLE owned_by ADD CONSTRAINT fk_owned_by_ref_on_apartments FOREIGN KEY (apartment_id) REFERENCES apartments(id) ON DELETE CASCADE ON UPDATE CASCADE;