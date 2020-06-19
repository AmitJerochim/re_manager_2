module.exports = function(db, apartment_id){
    return new Promise(function(resolve, reject){
        var query = "select * from v_owned_by where current_owner=1 and apartment_id="+ apartment_id;
        db.execute(query, function(err, res) {
            let rows=res.rows;
            if (err) throw err;
            var ownership=
                {
                "id":rows[0].id, 
                "apartment_id":rows[0].apartment_id,
                "owner_id":rows[0].owner_id,
                "current_owner":rows[0].current_owner,
                "purchasing_date":rows[0].purchasing_date,
                "selling_date":rows[0].selling_date
                }
            resolve(ownership);
        });
       
    });  
}
    