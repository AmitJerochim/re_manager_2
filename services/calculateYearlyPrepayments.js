const formatDate = require("./formatDate.js");
const Promise = require("promise");
module.exports = function(db, year, rented_id){
    let prepayments=0;
    let daysLeft =365;
    let tupels
    return new Promise(function(resolve, reject){
	/*
	*
	*
	*code unvollstaendig.
	*bedarf ueberarbeitung.
	*1. code nimmt an, dass maximal eine aenderung im laufe des Jahres.
	*2. code nimmt an, dass wenn daysleft>0 eine aenderung stattgefunden hat.
	*2. Annahme wirft fehler, wenn Mietbeginn 01.08.2018. und abrechnung fuer 2018. 
	*	
	*/
        var query = "select * from v_tenants_planned_payments where rented_id="+ rented_id +" and payment_type='operation_costs' and date_part('year', beginning_date)<="+year+" order by id desc;";
	console.log("prepayment Calcluation starts here");
	console.log(query);        
	db.execute(query, function(err, res) {
            if (err) throw err;
            let rows= res.rows;
            resolve(rows);
        });
    })
    .then(function(rows){
        tupels= rows;
        return new Promise(function(resolve, reject){
	    let next_year=parseInt(year)+1;
            var query = "select age('"+formatDate(next_year+'-01-01')+"', '" +formatDate(tupels[0].beginning_date)+"') , ( Date '"+formatDate(next_year +'-01-01')+"' - Date '" +formatDate(tupels[0].beginning_date)+"') as days";
	    console.log(query);
            db.execute(query, function(err, res) {
                if (err) throw err;
                let rows= res.rows;
		console.log(rows[0].age.days);
                if (rows[0].age.years >0){
                    prepayments = 12*tupels[0].amount;
                    daysLeft=0;
                    resolve(prepayments);
                }else if (rows[0].age.days >0){
                    prepayments += (rows[0].age.months + rows[0].age.days/30.4) *tupels[0].amount;
                    daysLeft -= rows[0].days;
                    resolve(prepayments);
                }else{
                    prepayments += rows[0].age.months * tupels[0].amount;
                    daysLeft-= rows[0].days;
                    resolve(prepayments);
                }
                
            });
        })
        .then(function(prepayments){
            console.log('prepayments:  ' + prepayments);
	/*
	* hack, damit Fehlerfall funktioniert. Unterer Code wird jetzt niemals erreicht.
	*/
	    return Promise.resolve(prepayments); 
	/*
	*
	*/
            if(daysLeft>0){
                return new Promise(function(resolve, reject){
                    var query = "select age('" +formatDate(tupels[0].beginning_date)+"', '"+formatDate(year +'-01-01')+"') , (Date '" +formatDate(tupels[0].beginning_date)+"' -  Date '"+formatDate(year +'-01-01')+"') as days";
	            console.log(query);
                    db.execute(query, function(err, res) {
                        if (err) throw err;
                        let rows= res.rows;
                        if (rows[0].age.days >0){
                            prepayments += (rows[0].age.months + rows[0].age.days/30.4) *tupels[1].amount;
                            daysLeft-= rows[0].days;
                            resolve(prepayments);
                        }else{
                            prepayments += rows[0].age.months * tupels[1].amount;
                            daysLeft-= rows[0].days;
                            resolve(prepayments);
                        }
                        
                    });
                })   
            }else{ return Promise.resolve(prepayments); }
            
        })
    });  
}
    


