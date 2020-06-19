  
module.exports = function(db, building_id, apartment_indication, apartment_size, heating_area, floor){
  return new Promise(function(resolve, reject){
      var query = "INSERT INTO v_apartments(building_id, apartment_indication, apartment_size, heating_area, floor)values(" + building_id + ", '" + apartment_indication + "', "+ apartment_size +", " + heating_area + ", "+ floor +");";
      db.execute(query, function(err) {
        if (err) throw err;
        query = "select id from v_apartments order by id desc limit 1;"  
        db.execute(query, function(err, res) {
            if (err) throw err;
            let result =res.rows
            var apartment_id=result[0].id;
            resolve(apartment_id);    
         });
      });
  });
}
    


