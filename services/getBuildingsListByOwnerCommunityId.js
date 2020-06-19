var Promise = require("bluebird");

module.exports = function(db, owner_community_id){
    return new Promise(function(resolve, reject){
        var buildings=[];
       
       
        var query = "select owner_community_id, name, v_buildings.id as building_id, total_area, ground_floor_area, business_area, number_flats from v_owner_communities left join v_buildings on v_owner_communities.id=v_buildings.owner_community_id where v_owner_communities.id=" + owner_community_id;
       // query="select now();"
        db.execute(query, function(err, res) {
            if (err) reject();
            let rows=res.rows
            for(var i=0; i<rows.length; i++){
                var building=
                    {
                     "owner_community_id":rows[i].owner_community_id,
                     "name":rows[i].name,
                     "total_area":rows[i].total_area,
                     "ground_floor_area":rows[i].ground_floor_area,
                     "business_area":rows[i].business_area,
                     "number_flats":rows[i].number_flats
                     
                    }
                buildings.push(building);
            }
            resolve(buildings);
        });
    });
}