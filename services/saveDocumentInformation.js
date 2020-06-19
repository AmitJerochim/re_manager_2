
module.exports =function(db, rented_id, year){
    return new Promise( function(resolve, reject){
        var query = "select * from v_documents where rented_id="+ rented_id + " and calculation_year=" +year + " order by revision desc limit 1";
        db.execute(query, function(err, res) {
            let rows=res.rows;
            if (err) throw err;
            let docs=[];
            if(rows.length>0){
                let doc=
                    {
                    "id":rows[0].id,     
                    "rented_id":rows[0].rented_id, 
                    "year":rows[0].year,
                    "revision":rows[0].revision
                    }
                docs.push(doc)
            }
            resolve(docs);
        });
    })
    .then( function(docs){
        if(docs.length===0){
            return new Promise( function(resolve, reject){
                var query = "insert into v_documents(rented_id, calculation_year, revision)values("+ rented_id + ", " + year + ", 1);";
                db.execute(query, function(err, res) {
                    if (err) throw err;
                    resolve(1);
                });
            })            
        }else if(docs.length===1){
            let next_revision = docs[0].revision + 1;    
            return new Promise( function(resolve, reject){
                var query = "insert into v_documents(rented_id, calculation_year, revision)values("+ rented_id + ", " + year + ", "+ next_revision + ");";
                db.execute(query, function(err, res) {
                    if (err) throw err;
                    resolve(next_revision);
                });
            })        
        }
    })
}