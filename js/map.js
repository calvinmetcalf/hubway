var m;
var zoom = 14;
var center = new google.maps.LatLng(42.349474,-71.090555);
var xUrl = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D%22http%3A%2F%2Fwww.thehubway.com%2Fdata%2Fstations%2FbikeStations.xml%22&format=json"
  var station_infowindow = new google.maps.InfoWindow();
$(function() {
        $( "#tabs" ).tabs({
        collapsible: true,
            selected: -1
    	});
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
                        var icon = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chf=bg,s,67676700&chs=45x45&cht=p&chco=008000|E8F4F7&chd=t:" + loc.nbBikes + "," + loc.nbEmptyDocks + "&chp=2&chma=5,0"
                       
                        );
                        if(loc.locked == 'true'){
                        icon = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chf=bg,s,67676700&chs=45x45&cht=p&chco=000000|E5ECF9,000000&chd=t:4,4,4,4|1&chp=1.7&chma=|5");
                        }
                        var point = new google.maps.LatLng(loc.lat, loc.long);
                      var  marker = new google.maps.Marker({
        					position: point, 
							map: m,
							icon: icon,
                            shadow: new google.maps.MarkerImage("img/shadow.png",
                            new google.maps.Size(42,36),
                            new google.maps.Point(0,0),
                            new google.maps.Point(12, 33),
                            new google.maps.Size(32,36)
                            
                                ),
							title: loc.name,
                            shape: {
      coord: [20,25,15],
      type: "circle"}
						});
                       
                        google.maps.event.addListener(marker, 'click',
    						function()
							{
								station_infowindow.setContent(
									'<img src="http://chart.apis.google.com/chart?chs=220x145&cht=p&chco=008000|E8F4F7&chd=t:' + loc.nbBikes + ',' + loc.nbEmptyDocks + '&chdl=Bikes:' + loc.nbBikes + '|Docks:' + loc.nbEmptyDocks + '&chdls=000000,10&chma=5&chtt=' + loc.name + '&chts=000000,12,l&chp=2" />' 
									);
                                 station_infowindow.setOptions(
                                     {pixelOffset: new google.maps.Size(0,20)}
                                     );
								station_infowindow.open(m,marker);
                                 
							});
                        
					}
                    )
			},"jsonp"
    )
    if(navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = new google.maps.LatLng(position.coords.latitude,
                                             position.coords.longitude);

           
  m.setCenter(pos);
  m.setZoom(16);
          })}
      }
