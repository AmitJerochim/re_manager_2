const mergeOwnerCommunityCosts = require("./mergeOwnerCommunityCosts.js");
const calculateAccountingPeriod = require("./calculateAccountingPeriod.js");


module.exports = function (array, calculation_key){
 array.forEach(function(cost_position){
    cost_position.partial_costs = cost_position.costs*calculation_key
 })
}