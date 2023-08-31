// Define the URL for the tectonic plates data
const tectonicURL = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_orogens.json";

// Load the tectonic plates GeoJSON data
fetch(tectonicURL)
  .then((response) => response.json())
  .then((tectonicData) => {
    // Create a layer for the tectonic plates data
    const tectonicLayer = L.geoJSON(tectonicData, {
      style: {
        color: "#FFA500", 
        weight: 2,
      },
    });

    // Add the tectonic layer to the map
    tectonicLayer.addTo(map);
  });

// Create a layer control
const overlayMaps = {
  "Earthquakes": earthquakeLayer, // From logic.js
  "Tectonic Plates": tectonicLayer, 
};

L.control.layers(null, overlayMaps).addTo(map);
