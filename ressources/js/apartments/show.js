jQuery('document').ready(function(){

    jQuery(".costs-input").focusout(function(){
       var input = jQuery(this)
       input.val(input.val().replace(",","."));
    });
    
});