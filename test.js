var app;
var button;

$(document).ready(function(){
	
Vue.component('vessel-item', {
	template: "#grid-template",
	props: { data: Array, columns: Array},
	}
);

app = new Vue(
{ 
  el: '#app',
  data:{  
  message: "This will be a list of vessels.",
  gridColumns: ['VesselName', 'Speed', 'Latitude','Longitude'],
  vessels:[]} 
  }
);
	
button = $("div button");
button.on("click", function(){
  GetData();
});
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
