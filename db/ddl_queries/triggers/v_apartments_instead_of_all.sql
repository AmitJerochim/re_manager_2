
CREATE TRIGGER v_apartments_instead_of_all INSTEAD OF INSERT OR UPDATE OR DELETE 
ON v_apartments
FOR EACH ROW
EXECUTE PROCEDURE edit_apartments();