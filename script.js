    function switchSlide(slideIndex) {
      const slides = document.querySelectorAll('.slide');
      slides.forEach(slide => slide.classList.remove('active'));
      
      document.getElementById('slide' + slideIndex).classList.add('active');
    }

    // --- Globe Data ---
    const partnerLocations = [
      { lat: 39.0, lng: -98.0, name: 'North America HQ' },
      { lat: 48.8566, lng: 2.3522, name: 'Paris Branch' },
      { lat: -23.5505, lng: -46.6333, name: 'South America Partner' },
      { lat: 35.6762, lng: 139.6503, name: 'Tokyo Distribution' },
      { lat: -33.8688, lng: 151.2093, name: 'Sydney Operations' },
      { lat: 25.2048, lng: 55.2708, name: 'Dubai Office' }
    ];

    // --- Initialize Globe ---
    const world = Globe()
      (document.getElementById('globe-container'))
      .backgroundColor('rgba(0,0,0,0)') 
      .showAtmosphere(true)
      .atmosphereColor('#ffffff')
      .atmosphereAltitude(0.15)
      
      // --- HTML Markers with Text & Lines ---
      .htmlElementsData(partnerLocations)
      .htmlElement(d => {
        // Create the main wrapper
        const wrapper = document.createElement('div');
        wrapper.className = 'marker-wrapper';
        
        // Create the dot
        const dot = document.createElement('div');
        dot.className = 'globe-marker';
        
        // Create the connecting line
        const line = document.createElement('div');
        line.className = 'marker-line';
        
        // Create the text box
        const label = document.createElement('div');
        label.className = 'marker-label';
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
    fetch('https://raw.githubusercontent.com/vasturiano/globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson')
      .then(res => res.json())
      .then(countries => {
        world.hexPolygonsData(countries.features)
          .hexPolygonResolution(3) // Controls how many dots there are (3 or 4 is best)
          .hexPolygonMargin(0.6)   // High margin shrinks the shapes so they look like floating dots
          .hexPolygonColor(() => 'rgba(255, 255, 255, 0.7)'); // Color of the dots
      });

    // --- Styling the 3D space and rotation ---
    world.pointOfView({ lat: 20, lng: 10, altitude: 1.2 });
    
    world.controls().autoRotate = true;
    world.controls().autoRotateSpeed = 0.5;
    world.controls().enableZoom = false;
    world.globeMaterial().transparent = true;
    world.globeMaterial().opacity = 0.5;