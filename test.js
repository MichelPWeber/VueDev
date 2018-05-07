$(document).ready(function(){
alert("Do the ajax call here.");
  $.ajax({url:"http://www.wsdot.wa.gov/Ferries/API/Vessels/rest/vessellocations?apiaccesscode=7ff7eebd-711c-4126-830c-eab1aeb925c0",
         success: function(result){
          alert(result);
         }}
  );
});
