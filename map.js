require([
  "esri/widgets/Track",
  "esri/views/MapView",
  "esri/Map",
  "esri/Graphic",
  "esri/layers/GraphicsLayer",
  "esri/request",
], function (Track, MapView, Map, Graphic, GraphicsLayer, esriRequest) {
  var x = 0;
  var y = 0;

  var map = new Map({
    basemap: "topo",
    //basemap: Additional basemap options are: satellite, hybrid, topo, gray, dark-gray, oceans, osm, national-geographic
  });

  //this is hardcoded to Guatemalan centroid (approximate centroid)
  var view = new MapView({
    map: map,
    container: "viewDiv",
    center: [-90.625, 15.6],
    zoom: 8,
  });

  //punkte ansicht Karte Einstellungen
  var graphicsLayer = new GraphicsLayer();
  map.add(graphicsLayer);

  function createPoint(id, longitude, latitude, atributos) {
    // Punkte Einstellungen
    var point = {
      id: id,
      type: "point",
      longitude: longitude,
      latitude: latitude,
    };

    var simpleMarkerSymbol = {
      type: "simple-marker",
      color: [23, 162, 184], // https://www.w3schools.com/colors/colors_picker.asp
      outline: {
        color: [255, 255, 255], // white
        width: 1,
      },
    };

    var pointGraphic = new Graphic({
      geometry: point,
      atributos: atributos,
      symbol: simpleMarkerSymbol,
    });

    graphicsLayer.add(pointGraphic);
  }

  //anfang DES RESTS DIENST
  // Define the 'options' for the request
  var options = {
    query: {
      f: "json",
    },
    responseType: "json",
  };

  //PUNKTE Dienst addresse
  url = "http://localhost:3000/incyt/api/sos/getalertsmaster";
  esriRequest(url, options).then(function (response) {
    //TODO
    for (var i = 0; i < response.data.length; i++) {
      var atributos = ({
        departamen_1,
        municipi_1,
        point_x,
        point_y,
      } = response.data[i]);
      console.log(atributos);
      createPoint(
        response.data[i].id,
        response.data[i].point_x,
        response.data[i].point_y,
        atributos
      );
    }
  });
  //ENDE DES RESTS DIENST

  //MAP ANSICHT
  var coordsWidget = document.createElement("div");
  coordsWidget.id = "coordsWidget";
  coordsWidget.className = "esri-widget esri-component";
  coordsWidget.style.padding = "7px 15px 5px";
  view.ui.add(coordsWidget, "bottom-right");

  //*** Update lat, lon, zoom and scale ***//
  function showCoordinates(pt) {
    var coords =
      "Lat/Lon " +
      pt.latitude.toFixed(3) +
      " " +
      pt.longitude.toFixed(3) +
      " | Scale 1:" +
      Math.round(view.scale * 1) / 1 +
      " | Zoom " +
      view.zoom;
    coordsWidget.innerHTML = coords;
    this.x = pt.longitude.toFixed(5);
    this.y = pt.latitude.toFixed(5);
    //console.log(this.x, this.y);
  }

  //*** Add event and show center coordinates after the view is finished moving e.g. zoom, pan ***//
  view.watch(["stationary"], function () {
    showCoordinates(view.center);
  });

  //*** Add event to show mouse coordinates on click and move ***//
  view.on(["pointer-down", "pointer-move"], function (evt) {
    showCoordinates(view.toMap({ x: evt.x, y: evt.y }));
  });

  view.on(["click"], function (evt) {
    //console.log("clicked event triggered");

    view.hitTest(evt).then(getGraphics);
    //TODO ansehen data von Punk

    function getGraphics(response) {
      //console.log(response.results.length);
      if (response.results.length) {
        //TODO FIX FIELDS
        console.log(
          response.results[0].graphic.atributos.id +
            " " +
          response.results[0].graphic.atributos.departamen_1 +
            " " +
            response.results[0].graphic.atributos.municipi_1
        );
        //departamen_1, municipi_1, point_x, point_y ,n.descripcion
        alert(
          response.results[0].graphic.atributos.id +
            " " +
          response.results[0].graphic.atributos.departamen_1 +
            " " +
            response.results[0].graphic.atributos.municipi_1
        );

        //TODO eines SHÖNE FOTO MACHEN, data ansehen
      }
    }
  });
  // Create an instance of the Track widget
  // and add it to the view's UI
  var track = new Track({
    view: view,
  });

  view.ui.add(track, "top-left");
  // The sample will start tracking your location
  // once the view becomes ready
  view.when(function () {
    //uncomment to start with current location on load
    //track.start();
  });
});
