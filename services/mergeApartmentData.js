

var Promise= require("bluebird");
var getBuildingDetailsById = require("./getBuildingDetailsById.js");
var getApartmentDatailsById = require("./getApartmentDatailsById.js");
var getCurrentTenancyByApartmentId = require("./getCurrentTenancyByApartmentId.js");
var getCustomerDetailsById = require("./getCustomerDetailsById.js");


module.exports = function(db, apartment_id){
    var data = {};
    return new Promise(function(resolve){
        resolve(getApartmentDatailsById(db, apartment_id));
        })
        .then((apartment)=>{
            data.apartment=apartment;
            return new Promise(function(resolve){
            resolve(getBuildingDetailsById(db, data.apartment.building_id));
            })
            .then((building)=>{
                data.building=building; 
                return new Promise(function(resolve){
                resolve(getCurrentTenancyByApartmentId(db, apartment_id));
            })
            .then(function(tenancy){
                data.tenancy=tenancy;
                return new Promise(function(resolve){
                   resolve(getCustomerDetailsById(db, data.tenancy.tenant_id));
                }).then( (customer)=>{
                    data.customer=customer;
                    return Promise.resolve(data);
                })
            });    
        });    
    });
}