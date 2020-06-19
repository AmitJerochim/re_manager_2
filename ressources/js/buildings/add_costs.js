jQuery('document').ready(function(){
    alert("Hinweis... url query building_id referenziert auf weg_id. das verursacht viele bugs");    
    jQuery(".add_row_btn").unbind("click").click(function(){
        var house_cost_row = jQuery(".clonable").clone(true);
        house_cost_row.css("display", "block");
        house_cost_row.removeClass("clonable");
        house_cost_row.addClass("removable");
        jQuery(".house_costs_container").append(house_cost_row);
    });
    
   jQuery(".delete_row_btn").unbind("click").click(function(){
       jQuery(this).closest(".removable").remove();
   });
   
    jQuery("#add_costs_form").submit(function() {
        jQuery(".allocatable-ckeckbox:not(:checked)").each(function () {
            jQuery(this).attr('checked', true).val(0);
        });
    });
    
    jQuery(".costs-input").focusout(function(){
       var input = jQuery(this)
       input.val(input.val().replace(",","."));
    });
    //$(this) verursacht probleme
    jQuery("body").on("click",".house_cost_type_select",()=>{
        var select= $(this)[0].activeElement;
        console.log(select);
        
        //select.empty();
        select.classList.remove('house_cost_type_select');
        //select.addClass("active_select");
        //select.toggleClass("house_cost_type_select", false);
        var data;
        jQuery.ajax({
            url: "/house_cost_types_json",
            data: data,
            dataType: "json",
            success: (data)=>{
                jQuery.each(data, (i, item)=>{
                    console.log("succeed");
                    var option = document.createElement("option");
                    option.setAttribute("value", item.designation);
                    option.innerHTML=item.designation;
                    select.append(option); 
                });
            }
        });
    });
});
