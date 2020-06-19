
module.exports =function (sumsObject, prepayment){
let calculationResults = {}
calculationResults.prepayment =prepayment;
let all_partial_costs=0
all_partial_costs += sumsObject.apartment_costs.partialCosts;
all_partial_costs += sumsObject.owner_community_costs.total_living_area.partialCosts;
all_partial_costs += sumsObject.owner_community_costs.living_area_except_ground_floor.partialCosts;
all_partial_costs += sumsObject.owner_community_costs.number_flats.partialCosts;
all_partial_costs += sumsObject.owner_community_costs.living_area_except_business_area.partialCosts;
let difference = all_partial_costs -prepayment;
calculationResults.difference =difference;
calculationResults.all_partial_costs =all_partial_costs;

return calculationResults;
}