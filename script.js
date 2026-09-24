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


document.addEventListener("DOMContentLoaded", () => {
    // Set up the Intersection Observer
    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // If the element is in view
            if (entry.isIntersecting) {
                entry.target.classList.add('six8-visible');
                // Unobserve the element so it only animates once
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.15, 
        rootMargin: "0px 0px -50px 0px"
    });

    // Find all elements with the specific six8-animate class
    const animatedElements = document.querySelectorAll('.six8-animate');
    
    // Observe each element
    animatedElements.forEach(el => animationObserver.observe(el));
});


document.addEventListener("DOMContentLoaded", () => {
    
    // Find EVERY carousel on the page
    const carousels = document.querySelectorAll('.six8-carousel');

    carousels.forEach(carousel => {
        // Find the inner track to move it left and right
        const track = carousel.querySelector('.six8-carousel-track'); 
        const slides = carousel.querySelectorAll('.six8-carousel-slide');
        const btnNext = carousel.querySelector('.six8-btn-next');
        const btnPrev = carousel.querySelector('.six8-btn-prev');
        
        let currentSlide = 0;
        let autoPlayInterval;
        const autoPlayDelay = 6000;

        if (slides.length === 0) return; 

        // Function to change the slide
        function goToSlide(index) {
            // Handle looping logic
            currentSlide = index;
            if (currentSlide >= slides.length) currentSlide = 0;
            if (currentSlide < 0) currentSlide = slides.length - 1;
            
            // SLIDE ANIMATION: Move the track left by (100 * slide index)%
            track.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // Keep the active class updated just in case you want to style active slides later
            slides.forEach(slide => slide.classList.remove('active'));
            slides[currentSlide].classList.add('active');
        }

        function nextSlide() {
            goToSlide(currentSlide + 1);
        }

        function prevSlide() {
            goToSlide(currentSlide - 1);
        }

        // Auto-play timer
        function startAutoPlay() {
            clearInterval(autoPlayInterval);
            autoPlayInterval = setInterval(nextSlide, autoPlayDelay);
        }

        // Event Listeners for Arrows
        if (btnNext && btnPrev) {
            btnNext.addEventListener('click', () => {
                nextSlide();
                startAutoPlay();
            });
            
            btnPrev.addEventListener('click', () => {
                prevSlide();
                startAutoPlay();
            });
        }

        // Pause auto-play when hovering
        carousel.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
        carousel.addEventListener('mouseleave', startAutoPlay);

        // Initialize AutoPlay
        if (slides.length > 1) {
            startAutoPlay();
        }
    });

});

document.addEventListener("DOMContentLoaded", () => {
  const heroNavInputs = Array.from(document.querySelectorAll('.hero-navigation input[name="slide-nav"]'));
  
  if (heroNavInputs.length === 0) return;

  // 1. Function to activate a specific slide index and restart transition
  const activateSlide = (index) => {
    // Uncheck all inputs first so transition resets to 0% width
    heroNavInputs.forEach(input => input.checked = false);
    
    // Force a tiny browser repaint delay before checking the target input
    requestAnimationFrame(() => {
      heroNavInputs[index].checked = true;
      heroNavInputs[index].dispatchEvent(new Event('change', { bubbles: true }));
    });
  };

  // 2. Trigger animation immediately on initial load for whichever was checked in HTML
  const initialIndex = heroNavInputs.findIndex(input => input.checked);
  activateSlide(initialIndex !== -1 ? initialIndex : 0);

  // 3. Run autoplay timer
  setInterval(() => {
    const currentIndex = heroNavInputs.findIndex(input => input.checked);
    const nextIndex = (currentIndex + 1) % heroNavInputs.length;
    activateSlide(nextIndex);
  }, 10000);
});