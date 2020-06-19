SELECT
v_owner_communities.id as owner_community_id,
v_buildings.id as building_id,
v_buildings.street AS street,
v_buildings.street_nr AS street_nr,
v_buildings.post_code AS post_code,
v_buildings.city AS city,
total_area,
ground_floor_area,
owner_community_id,
business_area,
number_flats,
year_of_completion,
v_apartments.id AS apartment_id,
v_apartments.apartment_indication AS apartment_indication,
v_apartments.apartment_size AS apartment_size,
v_apartments.heating_area AS apartment_heating_area,
v_apartments.floor AS apartment_floor,
v_rented.id AS rented_id,
v_rented.current_tenant,
v_rented.beginning_rental_period,
v_rented.end_rental_period,
v_customers.first_name AS tenants_first_name,
v_customers.last_name AS tenants_last_name,
v_customers.care_of AS tenants_care_of,
v_customers.street AS tenants_street,
v_customers.street_nr AS tenants_street_nr,
v_customers.post_code AS tenants_post_code,
v_customers.city AS tenants_city,
v_customers.country AS tenants_country
FROM v_owner_communities
LEFT JOIN v_buildings ON v_owner_communities.id=v_buildings.owner_community_id
LEFT JOIN v_apartments ON v_buildings.id=v_apartments.building_id
LEFT JOIN v_rented ON v_rented.apartment_id=v_apartments.id
LEFT JOIN v_tenants ON v_rented.tenant_id=v_tenants.id
LEFT JOIN v_customers ON v_tenants.id=v_customers.id
where v_buildings.id=1
AND v_rented.current_tenant=1;

