
module.exports =function(){
    this.by_total_living_area=function(tenancy, owner_community, apartment){
        let key = (apartment.apartment_size*tenancy.accountingPeriod)/(365*owner_community.total_area);
        key = Math.round(key*10000)/10000;
        return Promise.resolve(key)
    }
    this.by_living_area_exept_groundfloor=function(tenancy, owner_community, apartment){
	if(apartment.apartment_floor.toString()==="0"){
	    return Promise.resolve(0);
	}else{
        let key = (apartment.apartment_size*tenancy.accountingPeriod)/(365*(owner_community.total_area-owner_community.ground_floor_area));
        key = Math.round(key*10000)/10000;
        return Promise.resolve(key)
	}    
    }
    this.by_number_flats=function(tenancy, owner_community, apartment){
        let key = tenancy.accountingPeriod/(365*owner_community.number_flats);
        key = Math.round(key*10000)/10000;
        return Promise.resolve(key)
    }
    this.for_individual_costs=function(tenancy, owner_community, apartment){
        let key = tenancy.accountingPeriod/365;
        key = Math.round(key*10000)/10000;
        return Promise.resolve(key)
    }
    this.by_living_area_exept_business_area=function(tenancy, owner_community, apartment){
        let key = (apartment.apartment_size*tenancy.accountingPeriod)/(365*(owner_community.total_area - owner_community.business_area));
        key = Math.round(key*10000)/10000;
        return Promise.resolve(key)
    }
}
