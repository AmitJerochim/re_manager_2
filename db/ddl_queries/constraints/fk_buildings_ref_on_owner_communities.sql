
ALTER TABLE buildings ADD CONSTRAINT fk_buildings_ref_on_owner_communities FOREIGN KEY (owner_community_id) REFERENCES owner_communities(id) ON DELETE CASCADE ON UPDATE CASCADE;