const formatDate = require("./formatDate.js");
const sortApartmentCosts = require("./sortApartmentCosts.js");
module.exports = function(db, apartment_id,year){
    
   return Promise.resolve( sortApartmentCosts(db, apartment_id) ).then( (costsArray)=>{
        let electricityArray=costsArray['electricity'];
        
        let taxesArray=costsArray['taxes'];
        let networkArray=costsArray['network'];
        let heatingArray=costsArray['heating'];
        let hot_waterArray=costsArray['hot_water'];
        let heating_and_hot_waterArray=costsArray['heating_and_hot_water'];
        let jahresanfang = new Date(year +'-01-01');
        let jahresende = new Date(year+1 +'-01-01');

        function getOneTimeCosts (array){
            let result = [];
            if(array.length > 0){
                array.forEach(function(e){
                    let kosteneintritt = new Date(e.beginning_date)
                    if(kosteneintritt > jahresanfang && kosteneintritt < jahresende){
                        result.push(e);
                    }
                })
            }
            return result;
        }

        function calculatePeriod (array){
            let result=[];
            if(array.length > 0){
                array.forEach(function(e){
                    if(e.ending_date===null){
                        let kosteneintritt = new Date(e.beginning_date)
                        if(jahresanfang>=kosteneintritt){
                            //abrechnungsjahr war nach dem kosteneintritt, geht voll ein.
                            e.days_paid= 365;
                            result.push(e);
                        }
                        if(jahresende<= kosteneintritt ){
                            //Abrechnungsjahr war vor dem kosteneintritt, geht nicht ein
                        }
                        if(jahresanfang < kosteneintritt && jahresende > kosteneintritt ){
                            //kosteneintritt ist im Abrechnungsjahr eingefallen
                            //bestimme differenz zwischen Jahresende und Kosteneintritt und multipliziere mit der Periode.
                            let days = (jahresende-e.beginning_date)/1000/3600/24;
                            e.days_paid= days;
                            result.push(e);
                        }
                            
                    }else{
                        let kosteneintritt = new Date(e.beginning_date);
                        let kostenaustritt = new Date(e.ending_date);
                        let kostenaustritt_plus_tag =new Date(kostenaustritt.getTime()+1000*3600*24);
                        if(kosteneintritt <= jahresanfang && kostenaustritt >= jahresende){
                            // geht voll ein
                            e.days_paid= 365;
                            result.push(e);
                        }
                        if(kosteneintritt < jahresanfang && kostenaustritt < jahresende && kostenaustritt > jahresanfang){
                            // kostenaustritt - Jahresanfang
                            let days = (kostenaustritt_plus_tag- jahresanfang)/1000/3600/24;
                            e.days_paid= days;
                            result.push(e);
                        }
                        if(kosteneintritt > jahresanfang && kostenaustritt < jahresende ){
                            // Kostenende -Kosteneintritt
                            let days = (kostenaustritt_plus_tag - kosteneintritt)/1000/3600/24;
                            e.days_paid= days;
                            result.push(e);
                        }
                        if(kosteneintritt > jahresanfang && kostenaustritt > jahresende && kosteneintritt <jahresende){
                            // jahresende - Kosteneintritt
                            let days = (jahresende - kosteneintritt)/1000/3600/24;
                            e.days_paid= days;
                            result.push(e);                            
                        }                        
                    }
                })
            }
            return result;
        }
        let kosten={};
        kosten.network = calculatePeriod(networkArray)
        kosten.electricity = calculatePeriod(electricityArray)
        kosten.taxes = calculatePeriod(taxesArray)
        kosten.heating = getOneTimeCosts(heatingArray)
        kosten.hot_water = getOneTimeCosts(hot_waterArray)
        kosten.heating_and_hot_water = getOneTimeCosts(heating_and_hot_waterArray)
        return Promise.resolve(kosten)
        
    })    
}