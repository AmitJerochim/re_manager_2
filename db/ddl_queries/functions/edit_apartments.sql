
CREATE OR REPLACE FUNCTION edit_apartments()
  RETURNS trigger AS
$BODY$
BEGIN
IF (TG_OP = 'DELETE') THEN
    UPDATE apartments SET deleted_at=NOW() WHERE id=OLD.id;
    RETURN null;
ELSIF (TG_OP = 'UPDATE') THEN
    UPDATE apartments SET apartment_indication=NEW.apartment_indication, building_id=NEW.building_id, apartment_size=NEW.apartment_size, heating_area=NEW.heating_area, floor=NEW.floor, updated_at=NOW() WHERE id=OLD.id;
    RETURN null;
ELSIF (TG_OP = 'INSERT') THEN
    INSERT INTO apartments( apartment_indication, building_id, apartment_size, heating_area, floor, created_at )values(NEW.apartment_indication, NEW.building_id, NEW.apartment_size, NEW.heating_area, NEW.floor, NOW());
    RETURN null;
END IF;


 RETURN null;
END;
$BODY$ LANGUAGE plpgsql;
