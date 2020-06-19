
CREATE TRIGGER v_documents_instead_of_all INSTEAD OF INSERT OR UPDATE OR DELETE 
ON v_documents
FOR EACH ROW
EXECUTE PROCEDURE edit_documents();