
CREATE TRIGGER v_owner_community_costs_instead_of_all INSTEAD OF INSERT OR UPDATE OR DELETE 
ON v_owner_community_costs
FOR EACH ROW
EXECUTE PROCEDURE edit_owner_community_costs();