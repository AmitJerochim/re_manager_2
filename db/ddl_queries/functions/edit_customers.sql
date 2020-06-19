
CREATE OR REPLACE FUNCTION edit_customers()
  RETURNS trigger AS
$BODY$
BEGIN
IF (TG_OP = 'DELETE') THEN
    UPDATE customers SET deleted_at=NOW() WHERE id=OLD.id;
    RETURN null;
ELSIF (TG_OP = 'UPDATE') THEN
    UPDATE customers SET first_name=NEW.first_name, last_name=NEW.last_name, care_of=NEW.care_of, street=NEW.street, street_nr=NEW.street_nr, post_code=NEW.post_code, city=NEW.city, is_owner=NEW.is_owner, is_tenant=NEW.is_tenant, iban=NEW.iban, bic=NEW.bic, account_owner=NEW.account_owner, updated_at=NOW() WHERE id=OLD.id;
    RETURN null;
ELSIF (TG_OP = 'INSERT') THEN
    INSERT INTO customers( first_name, last_name, care_of, street, street_nr, post_code, city, is_owner, is_tenant, iban, bic, account_owner, created_at )values(NEW.first_name, NEW.last_name, NEW.care_of, NEW.street, NEW.street_nr, NEW.post_code, NEW.city, 0, 0, NEW.iban, NEW.bic, NEW.account_owner, NOW());
    RETURN null;
END IF;


 RETURN null;
END;
$BODY$ LANGUAGE plpgsql;
