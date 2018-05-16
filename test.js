var app;
var button = $("div button")

$(document).ready(function(){
app = new Vue(
{ el: '#app',
  data:{  message:"This will be a list of vessels.",
  vessels:[]} 
  }
);
});



Vue.component('vessel-item', {
	props: ['vessel'],
  template: '<li>{{vessel.VesselName}}</li>'
}
);

button.on("click", function(){
  GetData();
});

function GetData(){
  $.ajax({url:"https://www.wsdot.wa.gov/Ferries/API/Vessels/rest/vessellocations?apiaccesscode=7ff7eebd-711c-4126-830c-eab1aeb925c0",
          dataType: "jsonp",
         success: function(result){
         app.vessels = result;
         }}
  );
};

function jsonCallback(json){
  console.log(json);
}
