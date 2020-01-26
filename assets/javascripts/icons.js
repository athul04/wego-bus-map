// Adds the custom icon for a vehicle
var VehicleIcon = L.Icon.extend({
  options: {
    iconSize: [32, 32],
    popupAnchor: [0, -14],
    shadowSize: [32, 50],
    shadowAnchor: [16, 16]
  }
})

// Adds the custom icon for a transit stop
var StopIcon = L.Icon.extend({
  options: {
    iconUrl: 'assets/stop.svg',
    iconSize: [16, 16],
    shadowUrl: null,
  }
})

// Route types and agencies have different markers
var getIcons = function (routeData) {
  var iconPath = 'assets/' + routeData.route_type + '.svg'
  var shadowPath = 'assets/' + routeData.route_type + '-shadow.svg'
  return {
    stationary: new VehicleIcon({
      iconUrl: iconPath,
      shadowUrl: null
    }),
    moving: new VehicleIcon({
      iconUrl: iconPath,
      shadowUrl: shadowPath
    })
  }
}
