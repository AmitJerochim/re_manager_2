
ALTER TABLE documents ADD CONSTRAINT fk_documents_ref_on_rented FOREIGN KEY (rented_id) REFERENCES rented(id) ON DELETE CASCADE ON UPDATE CASCADE;