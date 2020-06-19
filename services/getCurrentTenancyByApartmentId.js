module.exports = function(db, apartment_id){
    return new Promise(function(resolve, reject){
        var query = "select * from v_rented where current_tenant=1 and apartment_id="+ apartment_id;
        db.execute(query, function(err, res) {
            let rows=res.rows;
            if (err) throw err;
            var tenancy=
                {
                "rented_id":rows[0].id, 
                "apartment_id":rows[0].apartment_id,
                "tenant_id":rows[0].tenant_id,
                "current_tenant":rows[0].current_tenant,
                "beginning_rental_period":rows[0].beginning_rental_period,
                "end_rental_period":rows[0].end_rental_period
                }
            resolve(tenancy);
        });
       
    });  
}
    