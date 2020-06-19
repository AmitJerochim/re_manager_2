module.exports = function(db, apartment_id, customer_id, current_tenant, beginning_rental_period, end_rental_period){
    return new Promise(function(resolve, reject){

        var query = "insert into v_tenants(id)values(" + customer_id + ");";
        console.log(query)
        db.execute(query, function(err, res) {
            if (err) throw err;
            resolve();
        });
    }).then(function(){
        
        return new Promise(function(resolve, reject){
            var query = "insert into v_rented(apartment_id, tenant_id, current_tenant, beginning_rental_period)values(" + apartment_id +", "+customer_id +", "+current_tenant +", '"+beginning_rental_period + "');";
            console.log(query)
            db.execute(query, function(err, res) {
                if (err) throw err;
                resolve();
            });
          })
          .then( ()=>{
              return new Promise(function(resolve, reject){
                var query = "select id from v_rented order by id desc limit 1";
                console.log(query)
                db.execute(query, function(err, res) {
                    if (err) throw err;
                    let result=res.rows;
                    let rented_id=result[0].id;
                    resolve(rented_id);
                });
          })
         });
     
        
    });  
}
    

