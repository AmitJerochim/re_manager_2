
CREATE OR REPLACE FUNCTION edit_documents()
  RETURNS trigger AS
$BODY$
BEGIN
IF (TG_OP = 'DELETE') THEN
    UPDATE documents SET deleted_at=NOW() WHERE id=OLD.id;
    RETURN null;
ELSIF (TG_OP = 'UPDATE') THEN
    UPDATE documents SET rented_id=NEW.rented_id, calculation_year=NEW.calculation_year, revision=NEW.revision, updated_at=NOW() WHERE id=OLD.id;
    RETURN null;
ELSIF (TG_OP = 'INSERT') THEN
    INSERT INTO documents(rented_id, calculation_year, revision, created_at)values(NEW.rented_id, NEW.calculation_year, NEW.revision, NOW());
    RETURN null;
END IF;


 RETURN null;
END;
$BODY$ LANGUAGE plpgsql;
