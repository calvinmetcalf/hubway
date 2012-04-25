var m;
var zoom = 13;
var center = new google.maps.LatLng(42.340592,-71.09489);
var xUrl = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D%22http%3A%2F%2Fwww.thehubway.com%2Fdata%2Fstations%2FbikeStations.xml%22&format=json"
  var station_infowindow = new google.maps.InfoWindow();
$(function() {
       
        map();
});
      
      function map(){
            m = new google.maps.Map(document.getElementById('map'), {
      center: center,
      zoom: zoom,
      mapTypeId: 'roadmap'
    });
  
     $.get(xUrl,
            function(data)
            {
                var stations = data.query.results.stations.station;
                 $.each(stations,
        			function(i,loc)
					{
                        var icon = "http://chart.apis.google.com/chart?chf=bg,s,67676700&chs=50x50&cht=p&chco=008000|E8F4F7&chd=t:" + loc.nbBikes + "," + loc.nbEmptyDocks + "&chp=2&chma=0,5";
                        
                        var point = new google.maps.LatLng(loc.lat, loc.long);
                      var  marker = new google.maps.Marker({
        					position: point, 
							map: m,
							icon: icon,
                            shadow: "http://dl.dropbox.com/u/37626989/shdw.png",
							title: loc.name
						});
                       
                        google.maps.event.addListener(marker, 'click',
    						function()
							{
								station_infowindow.setContent(
									'<img src="http://chart.apis.google.com/chart?chs=220x145&cht=p&chco=008000|E8F4F7&chd=t:' + loc.nbBikes + ',' + loc.nbEmptyDocks + '&chdl=Bikes:' + loc.nbBikes + '|Docks:' + loc.nbEmptyDocks + '&chdls=000000,10&chma=5&chtt=' + loc.name + '&chts=000000,12,l&chp=2" />' 
									);
                                  
								station_infowindow.open(m,marker);
                                 
							});
                        
					}
                    )
			},"jsonp"
    )
    
 
      }