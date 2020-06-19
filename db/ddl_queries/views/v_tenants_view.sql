
CREATE VIEW v_tenants AS( SELECT id FROM tenants WHERE (deleted_at IS NULL)='t');
