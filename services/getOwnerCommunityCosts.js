module.exports = function(db,owner_community_id, year, distributor_key){
    return new Promise(function(resolve, reject){
        var costs=[];
        let query ="select v_owner_community_costs.id as id, owner_community_id, costs, year, allocatable, distributor_key, building_cost_type_id as type_id, designation from v_owner_community_costs JOIN v_building_cost_types on v_owner_community_costs.building_cost_type_id=v_building_cost_types.id where allocatable=1 and distributor_key='"+distributor_key+"' and year="+year+" and owner_community_id="+owner_community_id+";"
        console.log(query)
        db.execute(query, function(err, res) {
            if (err) reject();
            let rows=res.rows
            for(var i=0; i<rows.length; i++){
                var cost=
                    {
                      "id":rows[i].id,
                      "owner_community_id":rows[i].owner_community_id,
                      "designation":rows[i].designation,
                      "type_id":rows[i].type_id,
                      "year":rows[i].year,
                      "costs":rows[i].costs,
                      "allocatable":rows[i].allocatable,
                      "distributor_key":rows[i].distributor_key
                      
                    }
                costs.push(cost);
            }
            resolve(costs);
        });
    });
}
