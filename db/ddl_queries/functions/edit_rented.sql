
CREATE OR REPLACE FUNCTION edit_rented()
  RETURNS trigger AS
$BODY$
BEGIN
IF (TG_OP = 'DELETE') THEN
    UPDATE rented SET deleted_at=NOW() WHERE id=OLD.id;
    RETURN null;
ELSIF (TG_OP = 'UPDATE') THEN
    UPDATE rented SET apartment_id=NEW.apartment_id, tenant_id=NEW.tenant_id, current_tenant=NEW.current_tenant, beginning_rental_period=NEW.beginning_rental_period, end_rental_period=NEW.end_rental_period, updated_at=NOW() WHERE id=OLD.id;
    RETURN null;
ELSIF (TG_OP = 'INSERT') THEN
    INSERT INTO rented( apartment_id, tenant_id, current_tenant, beginning_rental_period, end_rental_period, created_at )values( NEW.apartment_id, NEW.tenant_id, NEW.current_tenant, NEW.beginning_rental_period, NEW.end_rental_period, NOW());
    RETURN null;
END IF;

 RETURN null;
END;
$BODY$ LANGUAGE plpgsql;
