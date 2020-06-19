var Promise = require("bluebird");
module.exports = function(db, building_id){
    return new Promise(function(resolve, reject){
        var query = "SELECT * FROM v_buildings where id=" + building_id + ";";
        db.execute(query, function(err, res) {
            console.log("err : " +err)
            if (err) reject();
            let rows=res.rows
            var building=
                {
                  "id":rows[0].id,
                  "street":rows[0].street,
                  "street_nr":rows[0].street_nr,
                  "post_code":rows[0].post_code,
                  "city":rows[0].city,
                  "total_area":rows[0].total_area,
                  "ground_floor_area":rows[0].ground_floor_area,
                  "business_area":rows[0].business_area,
                  "number_flats":rows[0].number_flats,
                  "year_of_completion":rows[0].year_of_completion,
                  "owner_community_id":rows[0].owner_community_id
                }
            resolve(building);
        });
    });
}