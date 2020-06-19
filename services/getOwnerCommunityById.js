module.exports = function(db, id){
    return new Promise(function(resolve, reject){
        var query = "select * from v_owner_communities where id="+ id;
        db.execute(query, function(err, res) {
            let rows=res.rows;
            if (err) throw err;
            var community=
                {
                "id":rows[0].id, 
                "name":rows[0].name,
                }
            resolve(community);
        });
       
    });  
}
    