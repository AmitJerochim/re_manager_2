var Promise = require("bluebird");

module.exports= function(db,req){
  return new Promise(function(resolve, reject){
    var building_id= req.params.id;

    var query = "UPDATE v_buildings SET street='" + req.body.street +
    "', street_nr='" + req.body.street_nr + "',post_code=" + req.body.post_code + 
    " ,city='" + req.body.city + "' ,total_area=" + req.body.total_area + 
    " ,ground_floor_area=" + req.body.ground_floor_area + 
    " ,business_area=" + req.body.business_area + 
    " ,number_flats=" + req.body.number_flats + 
    " ,year_of_completion=" + req.body.year_of_completion + 
    " where id="+req.params.id  +";" 
    db.execute( query, function(err, res) {
      if (err) throw err;
      resolve();
    });    
  });
  
}
