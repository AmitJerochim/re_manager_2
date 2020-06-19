const Functions= require("./helperFunctions.js");
const getApartmentDatailsById= require("./getApartmentDatailsById.js");
const getTenancyById= require("./getTenancyById.js");
const getBuildingDetailsById= require("./getBuildingDetailsById.js");
const getCustomerDetailsById= require("./getCustomerDetailsById.js");
const getOwnerCommunityById= require("./getOwnerCommunityById.js");
const calculateApartmentFinalCosts = require("./calculateApartmentFinalCosts.js");
const mergeOwnerCommunityCosts = require("./mergeOwnerCommunityCosts.js");
const calculateAccountingPeriod = require("./calculateAccountingPeriod.js");
const calculateDestributionKeyConstants = require("./calculateDestributionKeyConstants.js");
const CalculateDistributionKeys = require("./calculateDistributionKeys.js");
const calculateYearlyPrepayments = require("./calculateYearlyPrepayments.js");
const calculatePartialOwnerCommunityCosts = require("./calculatePartialOwnerCommunityCosts.js");
const calculatePartialApartmentCosts = require("./calculatePartialApartmentCosts.js");
const sumApartmentCosts = require("./sumApartmentCosts.js");
const sumOwnerCommunityCosts = require("./sumOwnerCommunityCosts.js");
const getCurrentOnwershipApartmentId = require("./getCurrentOnwershipApartmentId.js");
const sumSumsAndCalculateResults = require("./sumSumsAndCalculateResults.js");



module.exports = function(db, rented_id, year){

   let calculateDistributionKey = new CalculateDistributionKeys()
   let data={}
   return getTenancyById(db,rented_id)
    .then( (tenancy)=>{
      data.tenancy=tenancy;
      return getApartmentDatailsById(db, tenancy.apartment_id)
      .then( (apartment)=>{
        data.apartment=apartment;
        return getBuildingDetailsById(db, apartment.building_id)
        .then( (building)=>{
          data.building=building;
          // console.log(data)
          return getOwnerCommunityById(db, building.owner_community_id)
          .then( (owner_community)=>{
            data.owner_community=owner_community;
            return getCustomerDetailsById(db, data.tenancy.tenant_id)
            .then( (tenant)=>{
              data.tenant=tenant;
              // console.log(data)
              return calculateApartmentFinalCosts(db, data.apartment.apartment_id, year).then( (apartment_costs)=>{
                data.apartment_costs=apartment_costs;
                
                return Promise.resolve(mergeOwnerCommunityCosts(db, data.owner_community.id, year))
                .then(function(costs) {
                    data.ownerCommunityCosts=costs;
                    return Promise.resolve(calculateAccountingPeriod(db, data.tenancy.rented_id, year))
                    .then(function(period) {
                        data.tenancy.accountingPeriod=period;
                        // console.log(data.tenancy);
                        return Promise.resolve(calculateDestributionKeyConstants(db, data.owner_community))
                        .then(function(owner_community) {
                           data.owner_community=owner_community;
                           data.distributor_keys={}
                          return Promise.resolve(calculateDistributionKey.by_total_living_area(data.tenancy, data.owner_community, data.apartment))
                          .then(function(key) {
                             data.distributor_keys.by_total_living_area=key;
                            return Promise.resolve(calculateDistributionKey.by_number_flats(data.tenancy, data.owner_community, data.apartment))
                            .then(function(key) {
                               data.distributor_keys.by_number_flats=key;
                              return Promise.resolve(calculateDistributionKey.for_individual_costs(data.tenancy, data.owner_community, data.apartment))
                              .then(function(key) {
                                 data.distributor_keys.for_individual_costs=key;
                                return Promise.resolve(calculateDistributionKey.by_living_area_exept_business_area(data.tenancy, data.owner_community, data.apartment))
                                .then(function(key) {
                                   data.distributor_keys.by_living_area_exept_business_area=key;
                                  return Promise.resolve(calculateDistributionKey.by_living_area_exept_groundfloor(data.tenancy, data.owner_community, data.apartment))
                                  .then(function(key) {
                                     data.distributor_keys.by_living_area_exept_groundfloor=key;
                                    return Promise.resolve(calculateYearlyPrepayments(db, year, rented_id))
                                    .then(function(prepayment) {
                                      data.tenancy.prepayment=prepayment;
                                      return Promise.all([
                                        calculatePartialOwnerCommunityCosts(data.ownerCommunityCosts.total_living_area, data.distributor_keys.by_total_living_area),
                                        calculatePartialOwnerCommunityCosts(data.ownerCommunityCosts.number_flats, data.distributor_keys.by_number_flats),
                                        calculatePartialOwnerCommunityCosts(data.ownerCommunityCosts.living_area_except_business_area, data.distributor_keys.by_living_area_exept_business_area),
                                        calculatePartialOwnerCommunityCosts(data.ownerCommunityCosts.living_area_except_ground_floor, data.distributor_keys.by_living_area_exept_groundfloor),
                                        calculatePartialApartmentCosts(data.apartment_costs, data.distributor_keys.for_individual_costs)
                                      ])
                                        .then(function() {
                                          return Promise.resolve(sumApartmentCosts(data.apartment_costs))
                                          .then(function(summedApartmentCosts) {
                                            data.sums={}
                                            data.sums.apartment_costs=summedApartmentCosts
                                            return Promise.resolve(sumOwnerCommunityCosts(data.ownerCommunityCosts))
                                            .then(function(summedOwnerCommunityCosts) {
                                              data.sums.owner_community_costs=summedOwnerCommunityCosts
                                              return Promise.resolve(getCurrentOnwershipApartmentId(db,data.apartment.apartment_id))
                                              .then(function(ownership) {
                                                data.ownership=ownership;
                                                return Promise.resolve(getCustomerDetailsById(db,data.ownership.owner_id))
                                                .then(function(owner) {
                                                  data.owner=owner;
                                                    data.calculationResults=sumSumsAndCalculateResults(data.sums, data.tenancy.prepayment)
                                                    // console.log(data)
                                                   return Promise.resolve(data);
                                              })    
                                            })  
                                          })                                               
                                        })                    
                                      })             
                                    })           
                                  })            
                                })           
                              })       
                            })   
                          }) 
                        })    
                    })    
                })
              })
            })        
          })
        })
      })
    })
}