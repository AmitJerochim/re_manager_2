module.exports = function(db, rented_id, amount, beginning_date, ending_date, period, payment_type){
    return new Promise(function(resolve, reject){

        var query = "select id from v_tenants_planned_payments where rented_id="+ rented_id +" order by beginning_date desc limit 1;";
        console.log(query)
        db.execute(query, function(err, res) {
            if (err) throw err;
            let rows= res.rows;
            resolve(rows);
        });
    })
    .then(function(rows){
        console.log("if");
        return new Promise(function(resolve, reject){
            var query = "insert into v_tenants_planned_payments(rented_id, amount, beginning_date, period, payment_type)values(" + rented_id +", "+amount +", '"+beginning_date +"', '"+period +"', '"+payment_type + "');";
            console.log("query  :  "  +query)
            db.execute(query, function(err, res) {
                if (err) throw err;
                resolve();
            });
        })    
    });  
}
    

