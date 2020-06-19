    
module.exports = function(db, building_cost_type){
  return new Promise(function(resolve, reject){
    let query = "SELECT count(*) AS occurs FROM v_building_cost_types WHERE designation='"+building_cost_type+"';";
    db.execute(query, function(err, res) {
      let rows= res.rows;
      if (err) throw err;
      resolve(rows[0].occurs);
    });
  }).then(function(occurs){
       return new Promise(function(resolve, reject){
         if(occurs==0){
            let query = "INSERT INTO v_building_cost_types(designation) values('"+  building_cost_type +"');"
            db.execute( query, function(err) {
              if (err) throw err;
              resolve();
            });          
         }else{resolve();}
       });
    });
}
    


