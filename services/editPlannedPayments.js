module.exports = function(db, rented_id, amount, date, period, payment_type){
    return new Promise(function(resolve, reject){

        var query = "select id from v_tenants_planned_payments where rented_id="+ rented_id +" and payment_type='" + payment_type + "' order by beginning_date desc limit 1;";
        console.log(query)
        db.execute(query, function(err, res) {
            if (err) throw err;
            let rows= res.rows;
            resolve(rows);
        });
    })
    .then(function(rows){
       if(rows.length>0){
        return new Promise(function(resolve, reject){
            var query = "Update v_tenants_planned_payments set ending_date =date('"+date +"') - INTERVAL '1 DAY' where id=" + rows[0].id;
            console.log("query  :  "  +query)
            db.execute(query, function(err, res) {
                if (err) throw err;
                resolve();
            });
        })
        .then( function(){
            return new Promise(function(resolve, reject){
            var query = "insert into v_tenants_planned_payments(rented_id, amount, beginning_date, period, payment_type)values(" + rented_id +", "+amount +", '"+date +"', '"+period +"', '"+payment_type + "');";
            console.log("query  :  "  +query)
            db.execute(query, function(err, res) {
                if (err) throw err;
                resolve();
            });
        })    
        })
       }else{
        return new Promise(function(resolve, reject){
            var query = "insert into v_tenants_planned_payments(rented_id, amount, beginning_date, period, payment_type)values(" + rented_id +", "+amount +", '"+date +"', '"+period +"', '"+payment_type + "');";
            console.log("query  :  "  +query)
            db.execute(query, function(err, res) {
                if (err) throw err;
                resolve();
            });
        })  
       } 
    });  
}
    

