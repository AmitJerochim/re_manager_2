
ALTER TABLE apartment_costs ADD CONSTRAINT fk_apartment_costs_ref_on_apartments FOREIGN KEY (apartment_id) REFERENCES apartments(id) ON DELETE CASCADE ON UPDATE CASCADE;