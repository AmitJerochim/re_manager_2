$('document').ready(function(){

});

function up(){
    console.log("up");
    var street = document.getElementsByName("street")[0].value;
    var street_nr = document.getElementsByName("street_nr")[0].value;
    var post_code=document.getElementsByName("post_code")[0].value;
    var city = document.getElementsByName("city")[0].value;
    var year_of_completion = document.getElementsByName("year_of_completion")[0].value;
    var total_area = document.getElementsByName("total_area")[0].value;
    var number_flats = document.getElementsByName("number_flats")[0].value;
    var ground_floor_area = document.getElementsByName("ground_floor_area")[0].value;
    var business_area = document.getElementsByName("business_area")[0].value;
    var json = {
            "street":street, 
            "street_nr":street_nr,
            "post_code":post_code,
            "city":city,
            "year_of_completion":year_of_completion,
            "total_area":total_area,
            "ground_floor_area":ground_floor_area,
            "business_area":business_area,
            "number_flats":number_flats
            }
            
    var containsID=reverseString($(location).attr('href')).split("/");
    var id = containsID[1];
    var xhr = new XMLHttpRequest();
    xhr.open('PUT', '/buildings/'+ id , true);
    xhr.setRequestHeader('content-type' ,'application/json');
    xhr.onreadystatechange = function(){
        if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            window.location.href = "/buildings/"+ id;
        }
        if(xhr.readyState === XMLHttpRequest.DONE && xhr.status >= 400) {
            window.location.href = "/buildings";
        }
    }
    xhr.send(JSON.stringify(json));
}
