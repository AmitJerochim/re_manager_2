
CREATE OR REPLACE FUNCTION edit_tenants()
  RETURNS trigger AS
$BODY$
BEGIN
IF (TG_OP = 'DELETE') THEN
    UPDATE tenants SET deleted_at=NOW() WHERE id=OLD.id;
    UPDATE v_customers SET is_tenant=0 WHERE id=OLD.id;
    RETURN null;
ELSIF (TG_OP = 'UPDATE') THEN
    RETURN null;
ELSIF (TG_OP = 'INSERT') THEN
    INSERT INTO tenants( id, created_at )values(NEW.id, NOW());
    UPDATE v_customers SET is_tenant=1 WHERE id=NEW.id;
    RETURN null;
END IF;

 RETURN null;
END;
$BODY$ LANGUAGE plpgsql;
