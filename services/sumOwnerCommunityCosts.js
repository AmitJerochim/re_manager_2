
module.exports = function(costsObject){
    let summedUp ={};

    for (let key  in costsObject){
        summedUp[key]={}
        summedUp[key].partialCosts = 0;
        summedUp[key].finalCosts = 0;
        if (costsObject.hasOwnProperty(key)) {
            costsObject[key].forEach(function(costPosition){
            summedUp[key].partialCosts += costPosition.partial_costs;
            summedUp[key].finalCosts += costPosition.costs;                
            })

        }
    }
    return Promise.resolve(summedUp);
}