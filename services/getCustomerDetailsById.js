
var Promise= require("bluebird");


module.exports = function(db, customer_id){
    return new Promise(function(resolve){
        var query = "select * from v_customers where id="+customer_id;
        db.execute( query, function(err,res) {
        if (err) throw err;
        let rows=res.rows;
            var apartment=
            {
            "customer_id":rows[0].id,
            "first_name":rows[0].first_name,
            "last_name":rows[0].last_name,
            "care_of":rows[0].care_of,
            "street":rows[0].street,
            "street_nr":rows[0].street_nr,
            "post_code":rows[0].post_code,
            "city":rows[0].city,
            "is_owner":rows[0].is_owner,
            "is_tenant":rows[0].is_tenant,
            "iban":rows[0].iban,
            "bic":rows[0].bic,
            "account_owner":rows[0].account_owner
            }
            
        
            resolve(apartment);
        });
    });
}