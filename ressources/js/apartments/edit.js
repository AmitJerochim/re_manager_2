$("document").ready(function(){
   
   if( $("#tenant_name").val()!="" ){
       $("#is_rented").attr("checked", "checked");
       $(".clonable").clone().children().appendTo("#tenant_container");
       $("#tenant_container").show();
   }
   
   $("#is_rented").unbind('change').change(function(){
       if(this.checked){
           $(".clonable").clone().children().appendTo("#tenant_container");
           $("#tenant_container").show();
           
       }else{
           $("#tenant_container").hide();
           $("#tenant_container").empty();
       }
   });
   
   $('input[type=date]').datepicker();
   

  
   
});
   var updateApartment =function(){
        alert("called updateApartment");      
    var building_id = document.getElementsByName("building_id")[0].value;
    var apartment_indication = document.getElementsByName("apartment_indication")[0].value;
    var apartment_size=document.getElementsByName("apartment_size")[0].value;
    var apartment_taxes = document.getElementsByName("apartment_taxes")[0].value;
    var apartment_floor = document.getElementsByName("apartment_floor")[0].value;
    var is_rented = document.getElementsByName("is_rented")[0].value;
    var current_tenant = document.getElementsByName("current_tenant")[0].value;
    var tenant_name=document.getElementsByName("tenant_name")[0].value;
    var net_cold_rent = document.getElementsByName("net_cold_rent")[0].value;
    var property_charges = document.getElementsByName("property_charges")[0].value;
    var beginning_rental_period = document.getElementsByName("beginning_rental_period")[0].value;

    var json = {
            "building_id":building_id, 
            "apartment_indication":apartment_indication,
            "apartment_size":apartment_size,
            "apartment_taxes":apartment_taxes,
            "apartment_floor":apartment_floor, 
            "is_rented":is_rented,
            "current_tenant":current_tenant,
            "tenant_name":tenant_name,
            "net_cold_rent":net_cold_rent,
            "property_charges":property_charges,
            "beginning_rental_period":beginning_rental_period,
            
            }
    var containsID=reverseString($(location).attr('href')).split("/");
    var id = containsID[1];
    var xhr = new XMLHttpRequest();
    xhr.open('PUT', '/apartments/'+ id , true);
    xhr.setRequestHeader('content-type' ,'application/json');
    xhr.onreadystatechange = function(){
        if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            window.location.href = "/apartments/"+ id;
        }
        if(xhr.readyState === XMLHttpRequest.DONE && xhr.status >= 400) {
            window.location.href = "/buildings";
        }
    }
    xhr.send(JSON.stringify(json));

   }