$("document").ready(function(){
    
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