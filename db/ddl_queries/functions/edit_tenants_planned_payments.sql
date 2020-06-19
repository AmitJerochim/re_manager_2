
CREATE OR REPLACE FUNCTION edit_tenants_planned_payments()
  RETURNS trigger AS
$BODY$
BEGIN
IF (TG_OP = 'DELETE') THEN
    UPDATE tenants_planned_payments SET deleted_at=NOW() WHERE id=OLD.id;
    RETURN null;
ELSIF (TG_OP = 'UPDATE') THEN
    UPDATE tenants_planned_payments SET rented_id=NEW.rented_id, amount=NEW.amount, beginning_date=NEW.beginning_date, ending_date=NEW.ending_date, period=NEW.period, payment_type=NEW.payment_type, updated_at=NOW() WHERE id=OLD.id;
    RETURN null;
ELSIF (TG_OP = 'INSERT') THEN
    INSERT INTO tenants_planned_payments(rented_id, amount, beginning_date, ending_date, period, payment_type, created_at )values( NEW.rented_id, NEW.amount, NEW.beginning_date, NEW.ending_date, NEW.period, NEW.payment_type, NOW());
    RETURN null;
END IF;

 RETURN null;
END;
$BODY$ LANGUAGE plpgsql;
