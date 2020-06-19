const getBuildingsListByOwnerCommunityId = require("./getBuildingsListByOwnerCommunityId.js");

module.exports =function(db, owner_community){
    let owner_communityObject = owner_community
    owner_communityObject.total_area=0
    owner_communityObject.business_area=0
    owner_communityObject.ground_floor_area=0;
    owner_communityObject.number_flats=0;
    return Promise.resolve(getBuildingsListByOwnerCommunityId(db, owner_community.id)).then(function(buildings) {
        buildings.forEach(function(building){
            owner_communityObject.total_area += building.total_area;
            owner_communityObject.business_area += building.business_area;
            owner_communityObject.ground_floor_area += building.ground_floor_area;
            owner_communityObject.number_flats += building.number_flats;
        })
        return Promise.resolve(owner_communityObject);
})
}