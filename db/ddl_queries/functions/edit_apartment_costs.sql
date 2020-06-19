
CREATE OR REPLACE FUNCTION edit_apartment_costs()
  RETURNS trigger AS
$BODY$
BEGIN
IF (TG_OP = 'DELETE') THEN
    UPDATE apartment_costs SET deleted_at=NOW() WHERE id=OLD.id;
    RETURN null;
ELSIF (TG_OP = 'UPDATE') THEN
    UPDATE apartment_costs SET apartment_id=NEW.apartment_id, designation=NEW.designation, costs=NEW.costs, period=NEW.period, beginning_date=NEW.beginning_date, ending_date=NEW.ending_date, updated_at=NOW() WHERE id=OLD.id;
    RETURN null;
ELSIF (TG_OP = 'INSERT') THEN
    INSERT INTO apartment_costs( apartment_id, designation, costs, period, beginning_date, ending_date, created_at )values(NEW.apartment_id, NEW.designation, NEW.costs, NEW.period, NEW.beginning_date, NEW.ending_date, NOW());
    RETURN null;
END IF;


 RETURN null;
END;
$BODY$ LANGUAGE plpgsql;
