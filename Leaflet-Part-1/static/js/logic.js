// Define the URL for the earthquake data
const earthquakeURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Create map centered on the US
const map = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5,
});

// Add base map
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
}).addTo(map);

// Fetch earthquake data
fetch(earthquakeURL)
  .then((response) => response.json())
  .then((data) => {
    data.features.forEach((earthquake) => {
      const magnitude = earthquake.properties.mag;
      const depth = earthquake.geometry.coordinates[2];
      const location = earthquake.properties.place;

      // Define markers
      const markerOptions = {
        radius: magnitude * 3, 
        fillColor: getColor(depth), 
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8,
      };

      // Create a circle marker and bind a popup
      const marker = L.circleMarker([earthquake.geometry.coordinates[1], earthquake.geometry.coordinates[0]], markerOptions)
        .bindPopup(`<strong>Location:</strong> ${location}<br><strong>Magnitude:</strong> ${magnitude}<br><strong>Depth:</strong> ${depth}`)
        .addTo(map);
    });
  });

// Define getColor function to set color based on depth
function getColor(depth) {
  if (depth < 10) {
    return "#00FF00"; // Green
  } else if (depth < 30) {
    return "#FFFF00"; // Yellow
  } else if (depth < 50) {
    return "#FFA500"; // Orange
  } else {
    return "#FF0000"; // Red
  }
}

// Create legend
const legend = L.control({ position: "bottomright" });
legend.onAdd = function () {
  const div = L.DomUtil.create("div", "info legend");
  const depths = [-10, 10, 30, 50];
  for (let i = 0; i < depths.length; i++) {
    div.innerHTML +=
      '<i style="background:' + getColor(depths[i] + 1) + '"></i> ' +
      depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] + '<br>' : '+');
  }
  return div;
};
legend.addTo(map);
