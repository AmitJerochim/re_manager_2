console.log("works");
$("document").ready(function(){
   var containsID=reverseString($(location).attr('href')).split("/");
   var id = containsID[1];
   $("#go_back").attr("href", "/buildings/"+ id) 
});

function delete_item(){
    var containsID=reverseString($(location).attr('href')).split("/");
    var id = containsID[1];
    var xhr = new XMLHttpRequest();
    xhr.open('DELETE', '/buildings/' +id);
    xhr.onreadystatechange = function(){
        if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            window.location.href = "/buildings";
        }
        if(xhr.readyState === XMLHttpRequest.DONE && xhr.status >= 400) {
            window.location.href = "/buildings";
        }
    }
    xhr.send();
}