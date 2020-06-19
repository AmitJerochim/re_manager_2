
ALTER TABLE tenants_done_payments ADD CONSTRAINT fk_tenants_done_payments_ref_on_rented FOREIGN KEY (rented_id) REFERENCES rented(id) ON DELETE CASCADE ON UPDATE CASCADE;