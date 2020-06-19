
CREATE TRIGGER v_tenants_planned_payments_instead_of_all INSTEAD OF INSERT OR UPDATE OR DELETE 
ON v_tenants_planned_payments
FOR EACH ROW
EXECUTE PROCEDURE edit_tenants_planned_payments();