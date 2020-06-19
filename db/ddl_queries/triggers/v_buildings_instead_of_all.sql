
CREATE TRIGGER v_buildings_instead_of_all INSTEAD OF INSERT OR UPDATE OR DELETE 
ON v_buildings
FOR EACH ROW
EXECUTE PROCEDURE edit_buildings();