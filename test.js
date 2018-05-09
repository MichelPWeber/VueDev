$(document).ready(function(){
alert("Do the ajax call here.");
  $.ajax({url:"https://www.wsdot.wa.gov/Ferries/API/Vessels/rest/vessellocations?apiaccesscode=7ff7eebd-711c-4126-830c-eab1aeb925c0",
          dataType: "jsonp",
         success: function(result){
           $.each(result, function(key, value){
             console.log(key + ": " + value.VesselName);
           });
         }}
  );
});

function jsonCallback(json){
  console.log(json);
}

var app = new Vue({
  el: '#app',
  data: {message: "Vue is working!"}
});
