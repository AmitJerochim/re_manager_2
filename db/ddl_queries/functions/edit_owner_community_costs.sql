
CREATE OR REPLACE FUNCTION edit_owner_community_costs()
  RETURNS trigger AS
$BODY$
BEGIN
IF (TG_OP = 'DELETE') THEN
    UPDATE owner_community_costs SET deleted_at=NOW() WHERE id=OLD.id;
    RETURN null;
ELSIF (TG_OP = 'UPDATE') THEN
    UPDATE owner_community_costs SET owner_community_id=NEW.owner_community_id, costs=NEW.costs, year=NEW.year, allocatable=NEW.allocatable, distributor_key=NEW.distributor_key, building_cost_type_id=NEW.building_cost_type_id, updated_at=NOW() WHERE id=OLD.id;
    RETURN null;
ELSIF (TG_OP = 'INSERT') THEN
    INSERT INTO owner_community_costs( owner_community_id, costs, year, allocatable, distributor_key, building_cost_type_id, created_at )values(NEW.owner_community_id, NEW.costs, NEW.year, NEW.allocatable, NEW.distributor_key, NEW.building_cost_type_id, NOW());
    RETURN null;
END IF;

 RETURN null;
END;
$BODY$ LANGUAGE plpgsql;
