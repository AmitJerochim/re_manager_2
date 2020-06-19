
CREATE OR REPLACE FUNCTION edit_buildings()
  RETURNS trigger AS
$BODY$
BEGIN
IF (TG_OP = 'DELETE') THEN
    UPDATE buildings SET deleted_at=NOW() WHERE id=OLD.id;
    RETURN null;
ELSIF (TG_OP = 'UPDATE') THEN
    UPDATE buildings SET street=NEW.street, street_nr=NEW.street_nr, post_code=NEW.post_code, city=NEW.city, total_area=NEW.total_area, ground_floor_area=NEW.ground_floor_area, business_area=NEW.business_area, number_flats=NEW.number_flats, year_of_completion=NEW.year_of_completion, owner_community_id=NEW.owner_community_id , updated_at=NOW() WHERE id=OLD.id;
    RETURN null;
ELSIF (TG_OP = 'INSERT') THEN
    INSERT INTO buildings( street, street_nr, post_code, city, total_area, ground_floor_area, business_area, number_flats, year_of_completion, owner_community_id , created_at )values(NEW.street, NEW.street_nr, NEW.post_code, NEW.city, NEW.total_area, NEW.ground_floor_area, NEW.business_area, NEW.number_flats, NEW.year_of_completion, NEW.owner_community_id , NOW());
    RETURN null;
END IF;


 RETURN null;
END;
$BODY$ LANGUAGE plpgsql;
