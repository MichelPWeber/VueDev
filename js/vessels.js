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
		props: { data: Array, history: Array, status: String},
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
			},
			makeGrid: function(){
				var i;
				var width = 600;
				var height = 600;
				var spacing = width/10;
				var gridSVG = "";
				
				for (i = 0; i <= width; i = i + spacing)
				{
					var x1 = i;
					var y1 = 0;
					var x2 = i;
					var y2 = height;
					var line = "<line x1='"+x1+"' y1='"+y1+"' x2='"+x2+"' y2='"+y2+"' style='stroke:rgb(196, 196, 196);stroke-width:.5'/>";
					gridSVG = gridSVG + line;
				}
				
				for (i = 0; i <= height; i = i + spacing)
				{
					var x1 = 0;
					var y1 = i;
					var x2 = width;
					var y2 = i;
					var line = "<line x1='"+x1+"' y1='"+y1+"' x2='"+x2+"' y2='"+y2+"' style='stroke:rgb(196, 196, 196);stroke-width:.5'/>";
					gridSVG = gridSVG + line;
				}
				
				return gridSVG;
				//return "<rect x='50' y='50' width='50' height='50'></rect>";
			},
		}
	}
);

app = new Vue(
{ 
  el: '#app',
  data:{  
  message: "",
  gridColumns: ['VesselName', 'Speed', 'Latitude','Longitude', 'ArrivingTerminalName'],
  vesselHistory: [],
  vessels:[]},
  	mounted(){
		// set up timer
		this.startTimer();
		this.GetData();
		}, 
  methods: {
	  startTimer(){
		  window.setInterval(this.timerTick, 1000*60);
	  },
	  timerTick(){
		  this.GetData();
	  },
	  GetData(){
		  $.ajax({url:"https://www.wsdot.wa.gov/Ferries/API/Vessels/rest/vessellocations?apiaccesscode=7ff7eebd-711c-4126-830c-eab1aeb925c0",
          dataType: "jsonp",
         success: function(result){
			 app.message = "Last update: " + $.now();
			 var dt = new Date();
			 app.message = "Last update: " + dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
			 app.UpdateHistory(app.vessels);
			app.vessels = result;
         }});
	  },
	  UpdateHistory(vesselData){
		  $.each(vesselData, function(key, value){
			//app.vesselHistory.push([value.VesselID, value.Latitude, value.Longitude]);  
			if (app.NumberOfWithID(value.VesselID, app.vesselHistory) < 50)
			{
				app.vesselHistory.push({id:value.VesselID, lat:value.Latitude, lng:value.Longitude});
			}
		  });
	  },
	  NumberOfWithID(id, array)
		{
			var count = 0;
			$.each(array, function(i, v){ if (v.VesselID === id) ++count;});
			return count;
		}
	},
  }
);




});


function jsonCallback(json){
  console.log(json);
}
