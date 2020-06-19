
CREATE OR REPLACE FUNCTION edit_owned_by()
  RETURNS trigger AS
$BODY$
BEGIN
IF (TG_OP = 'DELETE') THEN
    UPDATE owned_by SET deleted_at=NOW() WHERE id=OLD.id;
    RETURN null;
ELSIF (TG_OP = 'UPDATE') THEN
    UPDATE owned_by SET  apartment_id=NEW.apartment_id, owner_id=NEW.owner_id, current_owner=NEW.current_owner, purchasing_date=NEW.purchasing_date, selling_date=NEW.selling_date, updated_at=NOW() WHERE id=OLD.id;
    RETURN null;
ELSIF (TG_OP = 'INSERT') THEN
    INSERT INTO owned_by( apartment_id, owner_id, current_owner, purchasing_date, selling_date, created_at )values(NEW.apartment_id, NEW.owner_id, NEW.current_owner, NEW.purchasing_date, NEW.selling_date, NOW());
    RETURN null;
END IF;


 RETURN null;
END;
$BODY$ LANGUAGE plpgsql;
