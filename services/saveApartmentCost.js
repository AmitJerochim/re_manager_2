    
module.exports = function(db, apartment_id, designation, costs, period, beginning_date){
  if(designation==="heating" || designation==="hot_water" || designation==="heating_and_hot_water"){ period='once';}
  if(designation==="network") period='monthly';
  if(designation==="electricity" ) period='monthly';
  if(designation==="taxes") period='yearly';
  return new Promise(function(resolve, reject){
    let query = "SELECT id FROM v_apartment_costs WHERE apartment_id="+ apartment_id +" and designation='"+designation+"' order by id desc limit 1;";
    console.log(query);
    db.execute(query, function(err, res) {
      let rows= res.rows;
      if (err) throw err;
      console.log(rows)
      resolve(rows);
    });
  })
  .then(function(rows){
    console.log(rows.length)
    if(rows.length===0){
      return new Promise(function(resolve, reject){
            let query = "INSERT INTO v_apartment_costs(apartment_id, designation, costs, period, beginning_date) values("+  apartment_id +", '"+  designation +"', "+  costs +", '"+  period +"', '"+  beginning_date +"');"
            console.log(query);
            db.execute( query, function(err) {
              if (err) throw err;
              resolve();
            });          
      });      
    }else{
      return new Promise(function(resolve, reject){
            let query = "UPDATE v_apartment_costs SET ending_date='"+  beginning_date +"' WHERE id="+rows[0].id+";"
            console.log(query);
            db.execute( query, function(err) {
              if (err) throw err;
              resolve();
            });          
      })
      .then(function(){
        return new Promise(function(resolve, reject){
          let query = "INSERT INTO v_apartment_costs(apartment_id, designation, costs, period, beginning_date) values("+  apartment_id +", '"+  designation +"', "+  costs +", '"+  period +"', '"+  beginning_date +"');"
          console.log(query);
          db.execute( query, function(err) {
            if (err) throw err;
            resolve();
          });          
        });         
      })
    }
  });
}
    

