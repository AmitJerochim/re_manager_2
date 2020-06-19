
CREATE TRIGGER v_apartment_costs_instead_of_all INSTEAD OF INSERT OR UPDATE OR DELETE 
ON v_apartment_costs
FOR EACH ROW
EXECUTE PROCEDURE edit_apartment_costs();