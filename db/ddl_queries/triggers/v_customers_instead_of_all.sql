
CREATE TRIGGER v_customers_instead_of_all INSTEAD OF INSERT OR UPDATE OR DELETE 
ON v_customers
FOR EACH ROW
EXECUTE PROCEDURE edit_customers();