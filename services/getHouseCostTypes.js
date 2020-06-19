    
module.exports = function(db){
    return new Promise(function(resolve, reject){
        var costTypes=[];
        var query = "SELECT * FROM v_building_cost_types ORDER BY designation ASC;";
        db.execute(query, function(err, res) {
          let rows= res.rows;
          if (err) throw err;
          for(var i=0; i<rows.length; i++){
            var type=
              {
                "id":rows[i].id,
                "designation":rows[i].designation,
              }
            costTypes.push(type);
          }
          resolve(costTypes);
        });
    });
}
    
