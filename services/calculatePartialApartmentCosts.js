
module.exports = function (costsObject, calculation_key){
    for (let key  in costsObject){
        if (costsObject.hasOwnProperty(key)) {
            costsObject[key].partialCosts = costsObject[key].finalCosts * calculation_key;
        }
    }

}