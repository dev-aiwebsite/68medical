// --- Globe Data ---
const partnerLocations = [
  { id: "london", lat: 51.5074, lng: -0.1278, name: "London, UK" },
  { id: "shanghai", lat: 31.2304, lng: 121.4737, name: "Shanghai, China" },
  { id: "los-angeles", lat: 34.0522, lng: -118.2437, name: "Los Angeles, USA" },
  { id: "sao-paulo", lat: -23.5505, lng: -46.6333, name: "São Paulo, Brazil" },
  { id: "mumbai", lat: 19.0760, lng: 72.8777, name: "Mumbai, India" }
];

// --- Initialize Globe ---
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
world.pointOfView({ lat: 20, lng: 10, altitude: 1.2 });

world.controls().autoRotate = true;
world.controls().autoRotateSpeed = 0.5;
world.controls().enableZoom = false;
world.globeMaterial().transparent = true;
world.globeMaterial().opacity = 0.5;

document.addEventListener("DOMContentLoaded", () => {
  const heroNavInputs = Array.from(
    document.querySelectorAll('.hero-navigation input[name="slide-nav"]'),
  );

  if (heroNavInputs.length === 0) return;

  // 1. Function to activate a specific slide index and restart transition
  const activateSlide = (index) => {
    // Uncheck all inputs first so transition resets to 0% width
    heroNavInputs.forEach((input) => (input.checked = false));

    // Force a tiny browser repaint delay before checking the target input
    requestAnimationFrame(() => {
      heroNavInputs[index].checked = true;
      heroNavInputs[index].dispatchEvent(
        new Event("change", { bubbles: true }),
      );
    });
  };

  // 2. Trigger animation immediately on initial load for whichever was checked in HTML
  const initialIndex = heroNavInputs.findIndex((input) => input.checked);
  activateSlide(initialIndex !== -1 ? initialIndex : 0);

  // 3. Run autoplay timer
  setInterval(() => {
    const currentIndex = heroNavInputs.findIndex((input) => input.checked);
    const nextIndex = (currentIndex + 1) % heroNavInputs.length;
    activateSlide(nextIndex);
  }, 11000);
});