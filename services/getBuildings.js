var Promise = require("bluebird");

module.exports = function(db){
    return new Promise(function(resolve, reject){
        var buildings=[];
       
       
        var query = "SELECT * FROM v_buildings;"
       // query="select now();"
        db.execute(query, function(err, res) {
            if (err) reject();
            let rows=res.rows
            for(var i=0; i<rows.length; i++){
                var building=
                    {
                     "id":rows[i].id,
                     "street":rows[i].street,
                     "street_nr":rows[i].street_nr,
                     "post_code":rows[i].post_code,
                     "city":rows[i].city,
                     "total_area":rows[i].total_area,
                     "ground_floor_area":rows[i].ground_floor_area,
                     "business_area":rows[i].business_area,
                     "number_flats":rows[i].number_flats,
                     "year_of_completion":rows[i].year_of_completion,
                     "owner_community_id":rows[i].owner_community_id
                    }
                buildings.push(building);
            }
            resolve(buildings);
        });
    });
}