
CREATE OR REPLACE FUNCTION edit_tenants_done_payments()
  RETURNS trigger AS
$BODY$
BEGIN
IF (TG_OP = 'DELETE') THEN
    UPDATE tenants_done_payments SET deleted_at=NOW() WHERE id=OLD.id;
    RETURN null;
ELSIF (TG_OP = 'UPDATE') THEN
    UPDATE tenants_done_payments SET rented_id=NEW.rented_id, amount=NEW.amount, received_on=NEW.received_on, updated_at=NOW() WHERE id=OLD.id;
    RETURN null;
ELSIF (TG_OP = 'INSERT') THEN
    INSERT INTO tenants_done_payments(rented_id, amount, received_on, created_at )values( NEW.rented_id, NEW.amount, NEW.received_on, NOW());
    RETURN null;
END IF;

 RETURN null;
END;
$BODY$ LANGUAGE plpgsql;
