
module.exports = function(db, building_id){
    return new Promise(function(resolve, reject){
        var data=[];
        var query = "SELECT v_owner_communities.id as owner_community_id, v_buildings.id as building_id, v_buildings.street AS street, v_buildings.street_nr AS street_nr, v_buildings.post_code AS post_code, v_buildings.city AS city, total_area, ground_floor_area, owner_community_id, business_area, number_flats, year_of_completion, v_apartments.id AS apartment_id, v_apartments.apartment_indication AS apartment_indication, v_apartments.apartment_size AS apartment_size, v_apartments.heating_area AS apartment_heating_area, v_apartments.floor AS apartment_floor, v_rented.id AS rented_id, v_rented.current_tenant, v_rented.beginning_rental_period, v_rented.end_rental_period, v_customers.first_name AS tenants_first_name, v_customers.last_name AS tenants_last_name, v_customers.care_of AS tenants_care_of, v_customers.street AS tenants_street, v_customers.street_nr AS tenants_street_nr, v_customers.post_code AS tenants_post_code, v_customers.city AS tenants_city FROM v_owner_communities LEFT JOIN v_buildings ON v_owner_communities.id=v_buildings.owner_community_id LEFT JOIN v_apartments ON v_buildings.id=v_apartments.building_id LEFT JOIN v_rented ON v_rented.apartment_id=v_apartments.id LEFT JOIN v_tenants ON v_rented.tenant_id=v_tenants.id LEFT JOIN v_customers ON v_tenants.id=v_customers.id where v_buildings.id="+building_id+" AND v_rented.current_tenant=1;"

        db.execute( query, function(err,res) {
        if (err) throw err;
        let rows=res.rows;
        for(var i=0; i<rows.length; i++){
            var apartment=
            {
            "owner_community_id":rows[i].owner_community_id,
            "building_id":rows[i].building_id,
            "street":rows[i].street,
            "street_nr":rows[i].street_nr,
            "post_code":rows[i].post_code,
            "city":rows[i].city,
            "total_area":rows[i].total_area,
            "ground_floor_area":rows[i].ground_floor_area,
            "business_area":rows[i].business_area,
            "number_flats":rows[i].number_flats,
            "year_of_completion":rows[i].year_of_completion,
            "apartment_id":rows[i].apartment_id,
            "apartment_size":rows[i].apartment_size,
            "apartment_indication":rows[i].apartment_indication,
            "apartment_heating_area":rows[i].apartment_heating_area,
            "apartment_floor":rows[i].apartment_floor,
            "rented_id":rows[i].rented_id,
            "current_tenant":rows[i].current_tenant,
            "beginning_rental_period":rows[i].beginning_rental_period,
            "end_rental_period":rows[i].end_rental_period,
            "tenants_first_name":rows[i].tenants_first_name,
            "tenants_last_name":rows[i].tenants_last_name,
            "tenants_care_of":rows[i].tenants_care_of,
            "tenants_street":rows[i].tenants_street,
            "tenants_street_nr":rows[i].tenants_street_nr,
            "tenants_post_code":rows[i].tenants_post_code,
            // "v_tenants_planned_payments_id":rows[i].v_tenants_planned_payments_id,
            // "v_tenants_planned_payments_rented_id":rows[i].v_tenants_planned_payments_rented_id,
            // "v_tenants_planned_payments_amount":rows[i].v_tenants_planned_payments_amount,
            // "v_tenants_planned_payments_beginning_date":rows[i].v_tenants_planned_payments_beginning_date,
            // "v_tenants_planned_payments_ending_date":rows[i].v_tenants_planned_payments_ending_date,
            // "v_tenants_planned_payments_period":rows[i].v_tenants_planned_payments_period,
            // "v_tenants_planned_payments_payment_type":rows[i].v_tenants_planned_payments_payment_type,
            // "v_tenants_planned_payments_payment_type":rows[i].v_tenants_planned_payments_payment_type,
            // "v_tenants_done_payments_id":rows[i].v_tenants_done_payments_id,
            // "v_tenants_done_payments_rented_id":rows[i].v_tenants_done_payments_rented_id,
            // "v_tenants_done_payments_amount":rows[i].v_tenants_done_payments_amount,
            // "v_tenants_done_payments_received_on":rows[i].v_tenants_done_payments_received_on
            }
            data.push(apartment);
        }
            resolve(data);
        });
    });
}
