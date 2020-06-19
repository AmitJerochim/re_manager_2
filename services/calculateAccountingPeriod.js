const getTenancyById = require("./getTenancyById.js");
const formatDate = require("./formatDate.js");

/*
*
* returns the accounting period in days
*
*/
module.exports = function(db, rented_id, year){
    return Promise.resolve(getTenancyById(db,rented_id))
    .then(function(tenancy){
        return new Promise( function(resolve){
	    let next_year = parseInt(year)+1;
            let jahresanfang = new Date(year +'-01-01');
            let jahresende = new Date(next_year +'-01-01');
            let mietbeginn =new Date (tenancy.beginning_rental_period);
            let mietende= tenancy.end_rental_period;
            if(tenancy.end_rental_period !== null) {mietende = new Date (tenancy.end_rental_period)}

            let abrechnungszeitraum=0;
            
            if( mietende===null){
                if(mietbeginn > jahresende){
                    abrechnungszeitraum=0;
                }else if(mietbeginn < jahresanfang){
                    abrechnungszeitraum=365*24*3600*1000;
                }else if(mietbeginn > jahresanfang && mietbeginn < jahresende){
                    abrechnungszeitraum=jahresende - mietbeginn;
                }    
            }else{
                if(mietbeginn > jahresende){
                    abrechnungszeitraum=0;
                }else if(mietbeginn < jahresanfang && mietende > jahresende ){
                    abrechnungszeitraum=365*24*3600*1000;
                }else if(mietbeginn < jahresanfang && mietende < jahresende ){
                    abrechnungszeitraum= mietende-jahresanfang
                }else if(mietbeginn > jahresanfang && mietende < jahresende ){
                    abrechnungszeitraum= mietende-mietbeginn
                }
            }
            abrechnungszeitraum=abrechnungszeitraum/1000/3600/24;
            resolve(abrechnungszeitraum);
        })
    })
    
}
