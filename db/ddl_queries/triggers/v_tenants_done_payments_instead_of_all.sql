
CREATE TRIGGER v_tenants_done_payments_instead_of_all INSTEAD OF INSERT OR UPDATE OR DELETE 
ON v_tenants_done_payments
FOR EACH ROW
EXECUTE PROCEDURE edit_tenants_done_payments();