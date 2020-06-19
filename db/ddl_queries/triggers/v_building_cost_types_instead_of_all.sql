
CREATE TRIGGER v_building_cost_types_instead_of_all INSTEAD OF INSERT OR UPDATE OR DELETE 
ON v_building_cost_types
FOR EACH ROW
EXECUTE PROCEDURE edit_building_cost_types();