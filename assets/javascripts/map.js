var markers = {}
var locationMarker = {}
var tripUpdates = {}
var routesData = {}
var agenciesData = {}
var routeShapes = {}
var stopsData = {}

// Sets up a map of Nashville
var map = L.map('map', {
  doubleClickZoom: false,
  center: L.latLng(36.166512, -86.781581),
  maxBounds: L.latLngBounds(
    L.latLng(36.725005, -87.579122), // northwest
    L.latLng(35.541600, -86.097066) // southeast
  ),
  zoom: 12
})

L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}{r}.png', {
  subdomains: 'abcd',
  maxZoom: 19,
  minZoom: 11,
  attribution: $('#attribution_template').html(),
}).addTo(map)

var vehiclesLayer = L.layerGroup().addTo(map)
var routesLayer = L.layerGroup().addTo(map)
var stopsLayer = L.layerGroup().addTo(map)

L.control.layers(
  null,
  {
    'Vehicles': vehiclesLayer,
    'Routes': routesLayer,
    'Stops': stopsLayer
  }
).addTo(map)

// Handle location detection success
map.on('locationerror', function (e) {
  console.error(e)
  return window.alert('Unable to find your location.')
})

// Handle location detection error
map.on('locationfound', function (e) {
  var radius = e.accuracy / 2
  if (locationMarker.marker) {
    map.removeLayer(locationMarker.marker)
  }
  if (locationMarker.radius) {
    map.removeLayer(locationMarker.radius)
  }
  // If marker is outside of maxBounds, show error
  if (!map.options.maxBounds.contains(e.latlng)) {
    return window.alert('Your location is outside of the bounds of this map.')
  }
  locationMarker = {
    marker: L.marker(e.latlng).addTo(map).bindPopup('Accuracy: ' + Math.round(radius) + ' meters').openPopup(),
    radius: L.circle(e.latlng, radius).addTo(map)
  }
  map.setView(e.latlng, 14)
})
