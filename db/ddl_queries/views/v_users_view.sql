
CREATE VIEW v_users AS( SELECT id, username, password FROM users WHERE (deleted_at IS NULL)='t');
