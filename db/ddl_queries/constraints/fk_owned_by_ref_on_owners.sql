
ALTER TABLE owned_by ADD CONSTRAINT fk_owned_by_ref_on_owners FOREIGN KEY (owner_id) REFERENCES owners(id) ON DELETE CASCADE ON UPDATE CASCADE;