var Promise= require("bluebird");
var helperFunctions = function(){
    //tested
    this.calc_dest_key_by_total_area = function(accountingPeriod, apartment_size, building_size){
        return Math.round((apartment_size * accountingPeriod)*10000 / (building_size*365))/10000;
    } 
    //tested
    this.calc_dest_key_by_living_area_exept_groundfloor= function(accountingPeriod, apartment_size, total_area, ground_floor_area, floor){
        let dest_key_by_living_area_exept_groundfloor=0;
        let building_size_except_ground_floor =total_area- ground_floor_area;
        if (floor > 0) { dest_key_by_living_area_exept_groundfloor = Math.round((apartment_size * accountingPeriod*10000) / (building_size_except_ground_floor*365))/10000 }
        return dest_key_by_living_area_exept_groundfloor;
    }
    //tested
    this.calc_dest_key_by_number_flats =function(accountingPeriod, number_flats){
        return Math.round((accountingPeriod*10000) /(number_flats *365))/10000;
    }
    
    //tested
    this.calc_dest_key_for_individual_costs =function(accountingPeriod){
        return Math.round((accountingPeriod*10000) /(365))/10000;
    }
    this.calc_dest_key_by_living_area_exept_business_area= function(accountingPeriod, apartment_size, total_area, business_area){
        let building_size_except_business_area = total_area-business_area;
        return Math.round((apartment_size * accountingPeriod)*10000 / (building_size_except_business_area*365))/10000;
    }
    
    this.sumPartialCosts= function(dest_key, house_costs){
      var sum_partial_costs=0;
      for (var i=0; i<house_costs.length; i++){
          var partial_costs = house_costs[i].costs*dest_key;
          sum_partial_costs += Number(partial_costs);
      }
      return sum_partial_costs;
    }
              
    this.sumHouseCosts= function(house_costs){
      var sum_house_costs=0;
      for (var i=0;i<house_costs.length;i++){
          sum_house_costs += Number(house_costs[i].costs);
      }
      return sum_house_costs;
    }

   this.add_zeros = function(number){
      var num=number.toString();
      var arr= num.split('.');
      if(arr.length==1) num=num+'.';
      arr= num.split('.');
      if(arr[1].length==0) num=num+'00';
      else if (arr[1].length==1) num=num+'0';
      return num;
    }
    
   this.setAsCost = function(number){
     var add_zeros = function(number){
          var num=number.toString();
          var arr= num.split('.');
          if(arr.length==1) num=num+'.';
          arr= num.split('.');
          if(arr[1].length==0) num=num+'00';
          else if (arr[1].length==1) num=num+'0';
          return num;
    }
        number=(Math.round(number *100) /100)
         var cost= add_zeros(number);
         return cost.replace(".", ",");
         
    }
        
    //tested
    this.getAccountingPeriod = function(tenancy, year){
        var start_next_year =new Date(year,12,1);
        var end_last_year = new Date(year-1,11,31);
        var time_period=365;
        if (tenancy.beginning_rental_period > end_last_year) {
            time_period = (start_next_year - tenancy.beginning_rental_period)/(60*60*24*1000)
        }
        if (tenancy.end_rental_period!='0000-00-00' && tenancy.end_rental_period < start_next_year && tenancy.end_rental_period > end_last_year) {
            time_period = (tenancy.end_rental_period - end_last_year)/(60*60*24*1000);
        }
        if (time_period < 0) time_period=0;
        return time_period;
    }
}


module.exports = helperFunctions;