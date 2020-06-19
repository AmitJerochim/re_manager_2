
CREATE TRIGGER v_owner_communities_instead_of_all INSTEAD OF INSERT OR UPDATE OR DELETE 
ON v_owner_communities
FOR EACH ROW
EXECUTE PROCEDURE edit_owner_communities();