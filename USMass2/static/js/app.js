
function buildMap() {

  /* data route */
  var url = "/incidents";

  d3.json(url, function(error, response) {
    
    console.log(response[0]);

    var incidentMarkers = [];
    var mental_illness = [];
    var assault_weapon = [];
    var weapons_legal = [];
    var src

    //Parse through json object to extract pop-up data
    for (var i = 0; i < response.length; i++) {

      console.log(response[i].source )
      incidentMarkers.push(
      L.marker(response[i].location)
      .bindPopup("<h5>" + response[i].name + "</h5>\
                  <ul class=list-group>\
                  <li class=list-group-item>" + response[i].place + "</li>\
                  <li class=list-group-item>" + response[i].date+ "</li>\
                  <li class=list-group-item>" + response[i].victims+ " victims </li>\
                  <li class=list-group-item> <a href=" + response[i].source +" target='_blank'>source</a></li>")
      )

      if (response[i].mental_issues == "Yes"){
        
        mental_illness.push(
          L.marker(response[i].location)
          .bindPopup("<h5>" + response[i].name + "</h5>\
          <ul class=list-group>\
          <li class=list-group-item>" + response[i].place + "</li>\
          <li class=list-group-item>" + response[i].date+ "</li>\
          <li class=list-group-item>" + response[i].victims+ " victims </li>\
          <li class=list-group-item> <a href=" + response[i].source +" target='_blank'>source</a></li>")
          )}

        if (response[i].assault_rifle == "Yes"){
        
          assault_weapon.push(
            L.marker(response[i].location)
            .bindPopup("<h5>" + response[i].name + "</h5>\
            <ul class=list-group>\
            <li class=list-group-item>" + response[i].place + "</li>\
            <li class=list-group-item>" + response[i].date+ "</li>\
            <li class=list-group-item>" + response[i].victims+ " victims </li>\
            <li class=list-group-item> <a href=" + response[i].source +" target='_blank'>source</a></li>")
            )}

        if (response[i].weapons == "Yes"){
        
          weapons_legal.push(
            L.marker(response[i].location)
            .bindPopup("<h5>" + response[i].name + "</h5>\
            <ul class=list-group>\
            <li class=list-group-item>" + response[i].place + "</li>\
            <li class=list-group-item>" + response[i].date+ "</li>\
            <li class=list-group-item>" + response[i].victims+ " victims </li>\
            <li class=list-group-item> <a href=" + response[i].source +" target='_blank'>source</a></li>")
          )}
    }

    //create layer with all incidents
    var incident = L.layerGroup(incidentMarkers);

    //create layer with only incidents with prior mental illness
    var mentalillness = L.layerGroup(mental_illness);

    //create layer with only incidents with assault weapons
    var assault = L.layerGroup(assault_weapon);

    //create layer with only incidents with legally obtained weapons
    var legal_weapons = L.layerGroup(weapons_legal);

    // Create a map object
    var myMap = L.map("map", {
      center: [37.09, -95.71],
      zoom: 5
    });

      // Add a tile layer
    L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
      "access_token=pk.eyJ1IjoibWFsYWNoaXJhIiwiYSI6ImNqZGhrMXV6ejBjM2wyd28yY3VtajJvcTYifQ.hwWYJ006t5ZinWceLhnf9Q"
    ).addTo(myMap);

    // Define variables for our base layers
    var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
    "access_token=pk.eyJ1IjoibWFsYWNoaXJhIiwiYSI6ImNqZGhrMXV6ejBjM2wyd28yY3VtajJvcTYifQ.hwWYJ006t5ZinWceLhnf9Q"
    );

    // Create a baseMaps object
    var baseMaps = {
      "Street Map": streetmap
    };

    // Create a baseMaps object
    var baseMaps = {
    };

    // Create an overlay object
    var overlayMaps = {
      "All incidents": incident,
      "Prior mental illness":mentalillness,
      "Assault weapon used" : assault,
      "Weapons obtained legally" : legal_weapons
    };

    // Pass our map layers into our layer control
    // Add the layer control to the map
    var control = L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(myMap);

    myMap.on("overlayadd overlayremove", function (event) {

      var layer = event.layer,
            layerCategory;

      if (event.type === "overlayadd" && event.layer === mentalillness){
          myMap.removeLayer(incident);
          myMap.removeLayer(assault);
          myMap.removeLayer(legal_weapons);
          control._update();
        }
      else if (event.type === "overlayadd" && event.layer === assault){
          myMap.removeLayer(incident);
          myMap.removeLayer(mentalillness);
          myMap.removeLayer(legal_weapons);
          control._update();
        }
      else if (event.type === "overlayadd" && event.layer === legal_weapons){
          myMap.removeLayer(incident);
          myMap.removeLayer(mentalillness);
          myMap.removeLayer(assault);
          control._update();
        }
      else if (event.type === "overlayadd" && event.layer === incident){
          myMap.removeLayer(legal_weapons);
          myMap.removeLayer(mentalillness);
          myMap.removeLayer(assault);
          control._update();
        }
    })



  })

}

buildMap();