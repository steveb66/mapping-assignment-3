

var map = L.map('map').setView([40.71,-73.93], 11);

// set a tile layer to be CartoDB tiles 
var CartoDBTiles = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',{
  attribution: 'Map Data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> Contributors, Map Tiles &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
});

// add these tiles to our map
map.addLayer(CartoDBTiles);



// recycling bin dots

var recyclingBinsPointToLayer = function (feature, latlng){
	var recyclingBinsMarker = L.circle(latlng, 80, {
		stroke: false,
		fillColor: '#339933',
		fillOpacity: 1
	});
	
	return recyclingBinsMarker;	
}

var recyclingBinsClick = function (feature, layer) {
	// let's bind some feature properties to a pop up
	layer.bindPopup("<strong>Type:</strong> " + feature.properties.SiteType + "<br /><strong>Site: </strong>" + feature.properties.ParkSiteName);
}

var recyclingBinsGeoJSON = L.geoJson(recyclingBins, {
	pointToLayer: recyclingBinsPointToLayer,
	onEachFeature: recyclingBinsClick
}).addTo(map);




// neighborhood map
// let's use population to color the neighborhood map

var popStyle = function (feature){
    var value = feature.properties.Pop;
    var fillColor = null;
    if(value >= 0 && value <= 20000){
		fillColor = "#fee5d9";
    }
    if(value > 20001 && value <= 30000){
        fillColor = "#fcbba1";
    }
    if(value > 30001 && value<= 40000){
    	fillColor = "#fc9272";
    }
    if(value > 400001 && value <= 50000){
    	fillColor = "#fb6a4a";
    }
    if(value > 500001 && value <=100000) { 
		fillColor = "#de2d26";
    }
    if(value > 100001) { 
		fillColor = "#a50f15";
    }
    
        var style = {
        weight: 1,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.75,
        fillColor: fillColor
    }

    return style;
}

var popClick = function (feature, layer) {
	var totalPop = feature.properties.Pop;
	
	// let's bind some feature properties to a pop up
	layer.bindPopup("<strong>Neighborhood:</strong> " + feature.properties.NYC_NEIG + "<br /><strong>Population: </strong>" + totalPop ) ;
}

var neighborhoodsGeoJSON = L.geoJson(neighborhoods, {
    style: popStyle,
    onEachFeature: popClick
}).addTo(map);



