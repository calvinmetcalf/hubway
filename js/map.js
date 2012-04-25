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
  
     $.ajax(xUrl,
            function(data)
			{
                 var stations = $(data).find('station');
                 $.each(stations,
        			function(i,loc)
					{
                            var station_id		= $(loc).find('id').text();
						var station_name	= $(loc).find('name').text();
						var installed		= $(loc).find('installed').text();
						var temporary		= $(loc).find('temporary').text();
						var locked			= $(loc).find('locked').text();
						var removal_date	= $(loc).find('removalDate').text();
						var num_bikes		= $(loc).find('nbBikes').text();
						var num_empty_docks = $(loc).find('nbEmptyDocks').text();						
						var station_lat		= $(loc).find('lat').text();
						var station_long	= $(loc).find('long').text();
                        var icon = "http://chart.apis.google.com/chart?chf=bg,s,67676700&chs=50x50&cht=p&chco=008000|E8F4F7&chd=t:" + num_bikes + "," + num_empty_docks + "&chp=2&chma=0,5";
                        
                        var point = new google.maps.LatLng(station_lat, station_long);
                      var  marker = new google.maps.Marker({
        					position: point, 
							map: m,
							icon: icon,
                            shadow: "http://dl.dropbox.com/u/37626989/shdw.png",
							title: station_name
						});
                       
                        google.maps.event.addListener(marker, 'click',
    						function()
							{
								station_infowindow.setContent(
									'<img src="http://chart.apis.google.com/chart?chs=220x145&cht=p&chco=008000|E8F4F7&chd=t:' + num_bikes + ',' + num_empty_docks + '&chdl=Bikes:' + num_bikes + '|Docks:' + num_empty_docks + '&chdls=000000,10&chma=5&chtt=' + station_name + '&chts=000000,12,l&chp=2" />' 
									);
                                  
								station_infowindow.open(m,marker);
                                 
							});
                        
					}
                    )
			},"JSONP"
    )
    
   /* $.get(xUrl,
        	function(data)
			{
                var stations = $(data).find('station');
                $.each(stations,
    				function(i,loc)
					{
						// Grab Station Data
						var station_id		= $(loc).find('id').text();
						var station_name	= $(loc).find('name').text();
						var installed		= $(loc).find('installed').text();
						var temporary		= $(loc).find('temporary').text();
						var locked			= $(loc).find('locked').text();
						var removal_date	= $(loc).find('removalDate').text();
						var num_bikes		= $(loc).find('nbBikes').text();
						var num_empty_docks = $(loc).find('nbEmptyDocks').text();						
						var station_lat		= $(loc).find('lat').text();
						var station_long	= $(loc).find('long').text();
                        var icon = 'http://thehubway.com/assets/images/stations/hubway-map-icon-inservice.png';
                         point = new google.maps.LatLng(station_lat, station_long);
                        marker = new google.maps.Marker({
    						position: point, 
							map: map,
							icon: icon,
							title: station_name
						});
					});
                }
      )*/
      }