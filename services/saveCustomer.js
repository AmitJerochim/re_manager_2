    
module.exports = function(db, first_name, last_name, care_of, street, street_nr, post_code, city){
    return new Promise(function(resolve, reject){
        let query = "insert into v_customers(first_name, last_name, care_of, street, street_nr, post_code, city)values('" + first_name + "', '" + last_name + "', '" +care_of+ "', '" +street+ "', '" + street_nr+ "', '" + post_code + "', '" + city +"');";
        if( care_of=="" ) query = "insert into v_customers(first_name, last_name, street, street_nr, post_code, city)values('" + first_name + "', '" + last_name + "', '"  + street+ "', '" + street_nr+ "', '" + post_code + "', '" + city +"');";
        console.log(query);
        db.execute(query, function(err) {
            if (err) throw err;
            resolve();
        });
    }).then(function(){
        return new Promise(function(resolve, reject){
          var query = "select id from v_customers order by id desc limit 1;";
          db.execute(query, function(err,res) {
            if (err) throw err;
            let result=res.rows;
            let tenant_id=result[0].id;
            resolve(tenant_id);
          });
        });
    });  
}
    

