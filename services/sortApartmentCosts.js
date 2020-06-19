const formatDate = require("./formatDate.js");

module.exports = function(db, apartment_id){
    let apartmentCosts = [];
    return new Promise(function(resolve, reject){
            var query = "select * from v_apartment_costs where apartment_id=" +apartment_id+ " AND designation='taxes' order by id desc";
            db.execute(query, function(err, res) {
                if (err) throw err;
                let rows= res.rows;
                apartmentCosts['taxes']=rows;
                resolve(apartmentCosts)
            });
    })
    .then(function(apartmentCosts){
        return new Promise(function(resolve, reject){
            var query = "select * from v_apartment_costs where apartment_id=" +apartment_id+ " AND designation='network' order by id desc";
            db.execute(query, function(err, res) {
                if (err) throw err;
                let rows= res.rows;
                apartmentCosts['network']=rows;
                resolve(apartmentCosts)
            });
        })
        .then(function(apartmentCosts){
            return new Promise(function(resolve, reject){
            var query = "select * from v_apartment_costs where apartment_id=" +apartment_id+ " AND designation='heating' order by id desc";
                db.execute(query, function(err, res) {
                    if (err) throw err;
                    let rows= res.rows;
                    apartmentCosts['heating']=rows;
                    resolve(apartmentCosts)
                });
            })
            .then(function(apartmentCosts){
                return new Promise(function(resolve, reject){
                var query = "select * from v_apartment_costs where apartment_id=" +apartment_id+ " AND designation='electricity' order by id desc";
                    db.execute(query, function(err, res) {
                        if (err) throw err;
                        let rows= res.rows;
                        apartmentCosts['electricity']=rows;
                        resolve(apartmentCosts)
                    });
                })
                .then(function(apartmentCosts){
                    return new Promise(function(resolve, reject){
                    var query = "select * from v_apartment_costs where apartment_id=" +apartment_id+ " AND designation='hot_water' order by id desc";
                        db.execute(query, function(err, res) {
                            if (err) throw err;
                            let rows= res.rows;
                            apartmentCosts['hot_water']=rows;
                            resolve(apartmentCosts)
                        });
                    })
                    .then(function(apartmentCosts){
                        return new Promise(function(resolve, reject){
                        var query = "select * from v_apartment_costs where apartment_id=" +apartment_id+ " AND designation='heating_and_hot_water' order by id desc";
                            db.execute(query, function(err, res) {
                                if (err) throw err;
                                let rows= res.rows;
                                apartmentCosts['heating_and_hot_water']=rows;
                                resolve(apartmentCosts)
                            });
                        })
                    })
                })
            })
        })
    })
}