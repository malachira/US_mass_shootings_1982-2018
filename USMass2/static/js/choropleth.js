            
var map = L.map('choroplethmap').setView([37.8, -96], 4);

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic3ViaGFzdXNoaSIsImEiOiJjamRoank0YTAwZWE0MnhvMmw5eWd1OWU1In0.t6Bzt2OPJXvtCMb2I-UaTA', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
          '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
          'Imagery © <a href="http://mapbox.com">Mapbox</a>',
      id: 'mapbox.light'
  }).addTo(map);
            
var geojson = L.geoJson(statesData).addTo(map);

function getColor(d) {
return d > 100 ? '#d73027':
    d > 75  ? '#fc8d59' :
    d > 50  ? '#fee090' :
    d > 25  ? '#e0f3f8' :
    d > 10   ? '#91bfdb' :
    d > 5   ? '#4575b4' :
    
            '#FFEDA0';
    }

function style(feature) {
  return {
      fillColor: getColor(feature.properties.density),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
  };
  }

L.geoJson(statesData, {style: style}).addTo(map);

function highlightFeature(e) {
var layer = e.target;

layer.setStyle({
    weight: 5,
    color: '#666',
    dashArray: '',
    fillOpacity: 0.7
});

if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
}
}
        
var geojson;

function resetHighlight(e) {
    geojson.resetStyle(e.target);
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

geojson = L.geoJson(statesData, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);

var info = L.control();
        
info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<h4>US Firearms Provisions By State</h4>' +  (props ?
        '<b>' + props.name + '</b><br />' + props.density + ' provisions in place'
        : 'Hover over a state');
};

info.addTo(map);
        
        
function highlightFeature(e) {
    
    info.update(e.target.feature.properties);
}

function resetHighlight(e) {
    
    info.update();
}

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [5, 10, 25, 50, 75, 100],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);