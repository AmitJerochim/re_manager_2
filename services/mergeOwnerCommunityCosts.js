const getOwnerCommunityCosts = require("./getOwnerCommunityCosts.js");

module.exports = function (db, owner_community_id, year){
    let all_building_costs = {}

    return Promise.resolve(getOwnerCommunityCosts(db, owner_community_id, year, "total_living_area")).then(function(costs) {
        all_building_costs["total_living_area"]=costs;
            return Promise.resolve(getOwnerCommunityCosts(db, owner_community_id, year, "living_area_except_ground_floor")).then(function(costs) {
                all_building_costs["living_area_except_ground_floor"]=costs;
                return Promise.resolve(getOwnerCommunityCosts(db, owner_community_id, year, "number_flats")).then(function(costs) {
                    all_building_costs["number_flats"]=costs;
                    return Promise.resolve(getOwnerCommunityCosts(db, owner_community_id, year, "living_area_except_business_area")).then(function(costs) {
                        all_building_costs["living_area_except_business_area"]=costs;
                        //console.log(all_building_costs)
                        return Promise.resolve(all_building_costs);
                    })                         
                })                
            })
    })

}
