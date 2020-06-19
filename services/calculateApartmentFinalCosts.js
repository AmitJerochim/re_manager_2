const formatDate = require("./formatDate.js");
const calculateApartmentCostsPeriod = require("./calculateApartmentCostsPeriod.js");
module.exports = function(db, apartment_id,year){
    
   return Promise.resolve( calculateApartmentCostsPeriod(db, apartment_id, year) ).then( (costsObject)=>{
    for (let key  in costsObject){
        if (costsObject.hasOwnProperty(key)) {
            if (costsObject[key].length == 0){
                delete costsObject[key]
            }else{
                costsObject[key].forEach(function(element){
                    if(element.period==="monthly"){
                        element.finalCosts = element.costs*(element.days_paid/365)*12;
                    }
                    if(element.period==="yearly"){
                        element.finalCosts = element.costs*(element.days_paid/365);
                    }
                    if(element.period==="once"){
                        element.finalCosts = Number.parseFloat(element.costs);
                    }                        
                })
            }
        }
    }
    
    for (let key  in costsObject){
        if (costsObject.hasOwnProperty(key)) {
            if (costsObject[key].length > 1){
                let mergedCosts = costsObject[key][0]
                mergedCosts.finalCosts=0;
                mergedCosts.merged = true;
                delete mergedCosts.costs;
                delete mergedCosts.beginning_date;
                delete mergedCosts.ending_date;
                delete mergedCosts.days_paid;
                delete mergedCosts.id;
                costsObject[key].forEach(function(element){
                    mergedCosts.finalCosts+=element.finalCosts;
                })
                costsObject[key]=[mergedCosts];
            }
        }
    }
    
    for (let key  in costsObject){
        if (costsObject.hasOwnProperty(key)) {
            costsObject[key]=costsObject[key][0]
        }
    }
    
    return Promise.resolve(costsObject)
        
    })    
}