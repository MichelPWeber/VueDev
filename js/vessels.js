var app;
var button;

$(document).ready(function(){
	
Vue.component('vessel-item', {
	template: "#grid-template",
	props: { data: Array, columns: Array},
	}
);

Vue.component('graph-vessels', {
		template: "#graph-template",
		props: { data: Array},
		computed: {
			latCenter: function(){
				var max = -999;
				var min = 999;
				$.each(this.data, function(key, value){
					if (value.Latitude > max) max = value.Latitude;
					if (value.Latitude < min) min = value.Latitude;
				});
				
				var center = (max+min)/2;
				return center;
			},
			longCenter: function(){
				var max = -999;
				var min = 999;
				$.each(this.data, function(key, value){
					if (value.Longitude > max) max = value.Longitude;
					if (value.Longitude < min) min = value.Longitude;
				});
				
				return (max+min)/2;
			}
		}
	}
);

app = new Vue(
{ 
  el: '#app',
  data:{  
  message: "Vessel data: location.",
  gridColumns: ['VesselName', 'Speed', 'Latitude','Longitude', 'ArrivingTerminalName'],
  vessels:[]},
  	mounted(){
		// set up timer
		this.startTimer();
		}, 
  methods: {
	  startTimer(){
		  window.setInterval(this.timerTick, 1000*15);
	  },
	  timerTick(){
		  GetData();
	  }
  },
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
