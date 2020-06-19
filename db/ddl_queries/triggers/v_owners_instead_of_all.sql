
CREATE TRIGGER v_owners_instead_of_all INSTEAD OF INSERT OR UPDATE OR DELETE 
ON v_owners
FOR EACH ROW
EXECUTE PROCEDURE edit_owners();