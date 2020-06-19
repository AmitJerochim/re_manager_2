
module.exports = function(costsObject){
    let summedUp ={};
    summedUp.partialCosts = 0;
    summedUp.finalCosts = 0;
    for (let key  in costsObject){
        if (costsObject.hasOwnProperty(key)) {
            summedUp.partialCosts += costsObject[key].partialCosts;
            summedUp.finalCosts += costsObject[key].finalCosts;
        }
    }
    return Promise.resolve(summedUp);
}