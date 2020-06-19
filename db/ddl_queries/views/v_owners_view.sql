
CREATE VIEW v_owners AS( SELECT id FROM owners WHERE (deleted_at IS NULL)='t');
