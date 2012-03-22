var m;
var google = this.google;
var zoom = 8;
var center = new google.maps.LatLng(42.04113400940814,-71.795654296875);
$(function() {
       
        map();
     
      });
      
      function map(){
            m = new google.maps.Map(document.getElementById('map'), {
      center: center,
      zoom: zoom,
      mapTypeId: 'roadmap'
    });
      }