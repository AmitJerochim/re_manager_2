
var Promise= require("bluebird");


module.exports = function(db, apartment_id){
    return new Promise(function(resolve){
        var query = "select * from v_apartments where id="+apartment_id;
        db.execute( query, function(err,res) {
        if (err) throw err;
        let rows=res.rows;
            var apartment=
            {
            "apartment_id":rows[0].id,
            "building_id":rows[0].building_id,
            "apartment_size":rows[0].apartment_size,
            "apartment_indication":rows[0].apartment_indication,
            "apartment_heating_area":rows[0].heating_area,
            "apartment_floor":rows[0].floor
            }
            
        
            resolve(apartment);
        });
    });
}