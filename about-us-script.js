// --- Globe Data ---
const partnerLocations = [
  { id: "london", lat: 51.5074, lng: -0.1278, name: "London, UK" },
  { id: "shanghai", lat: 31.2304, lng: 121.4737, name: "Shanghai, China" },
  { id: "los-angeles", lat: 34.0522, lng: -118.2437, name: "Los Angeles, USA" },
  { id: "sao-paulo", lat: -23.5505, lng: -46.6333, name: "São Paulo, Brazil" },
  { id: "mumbai", lat: 19.0760, lng: 72.8777, name: "Mumbai, India" }
];

const world = Globe()(document.getElementById("globe-container"))
  .backgroundColor("rgba(0,0,0,0)")
  .showAtmosphere(true)
  .atmosphereColor("#ffffff")
  .atmosphereAltitude(0.15)

  // --- HTML Markers with Text & Lines ---
  .htmlElementsData(partnerLocations)
  .htmlElement((d) => {
    // Create the main wrapper
    const wrapper = document.createElement("div");
    wrapper.className = "marker-wrapper";
    
    // Add the unique ID from your data
    wrapper.id = `marker-${d.id}`;

    // Create the dot
    const dot = document.createElement("div");
    dot.className = "globe-marker";

    // Create the connecting line
    const line = document.createElement("div");
    line.className = "marker-line";

    // Create the text box
    const label = document.createElement("div");
    label.className = "marker-label";
    label.innerText = d.name;

    // Put them all inside the wrapper
    wrapper.appendChild(dot);
    wrapper.appendChild(line);
    wrapper.appendChild(label);

    // Click event for the entire marker
    wrapper.onclick = () => {
      alert(`You clicked on: ${d.name}`);
    };

    return wrapper;
  });

// --- Fetch Map Data to Create Dotted Hexagons ---
fetch(
  "https://raw.githubusercontent.com/vasturiano/globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson",
)
  .then((res) => res.json())
  .then((countries) => {
    world
      .hexPolygonsData(countries.features)
      .hexPolygonResolution(3) // Controls how many dots there are (3 or 4 is best)
      .hexPolygonMargin(0.6) // High margin shrinks the shapes so they look like floating dots
      .hexPolygonColor(() => "rgba(255, 255, 255, 0.7)"); // Color of the dots
  });

// --- Styling the 3D space and rotation ---
world.pointOfView({ lat: 20, lng: 10, altitude: 1.4 });

world.controls().autoRotate = true;
world.controls().autoRotateSpeed = 0.5;
world.controls().enableZoom = false;
world.globeMaterial().transparent = true;
world.globeMaterial().opacity = 0.5;

document.addEventListener("DOMContentLoaded", () => {

// --- Interactive Hover for Locations Grid ---
const locationElements = document.querySelectorAll('.loc');

locationElements.forEach(loc => {
  loc.addEventListener('mouseenter', (e) => {
    // 1. Pause auto-rotation so it doesn't fight the camera movement
    world.controls().autoRotate = false;
    
    // 2. Grab coordinates from the HTML data attributes
    const targetLat = parseFloat(e.currentTarget.getAttribute('data-lat'));
    const targetLng = parseFloat(e.currentTarget.getAttribute('data-lng'));
    
// 3. Subtract from the latitude to push the city up into the visible area
    // (Adjust this number between 15 and 35 until it sits exactly where you want it)
    const latOffset = 30; 
    const adjustedLat = targetLat - latOffset;
    
    // 4. Smoothly pan the globe to the adjusted coordinates
    world.pointOfView({ lat: adjustedLat, lng: targetLng}, 1000);
  });

  loc.addEventListener('mouseleave', () => {
    // Resume auto-rotation when mouse leaves the text
    world.controls().autoRotate = true;
  });
});

});