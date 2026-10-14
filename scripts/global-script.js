function switchSlide(slideIndex) {
  const slides = document.querySelectorAll(".slide");
  slides.forEach((slide) => slide.classList.remove("active"));

  document.getElementById("slide" + slideIndex).classList.add("active");
}

// 1. Create the observer globally
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('six8-visible');
            
            // Optional: Stop observing once it has animated in
            observer.unobserve(entry.target); 
        }
    });
}, { 
    root: null, 
    rootMargin: '0px', 
    threshold: 0.1 
});

// 2. Wrap the targeting logic in a function
function initScrollAnimations() {
    // Select all elements that have the animate class BUT haven't been animated yet
    const animatedElements = document.querySelectorAll('.six8-animate:not(.six8-visible)');
    
    animatedElements.forEach((el) => {
        observer.observe(el);
    });
}

// 3. Run it once on page load for the hardcoded HTML elements
document.addEventListener("DOMContentLoaded", () => {
    initScrollAnimations();
});

document.addEventListener("DOMContentLoaded", () => {
  // Find EVERY carousel on the page
  const carousels = document.querySelectorAll(".six8-carousel");

  carousels.forEach((carousel) => {
    // Find the inner track to move it left and right
    const track = carousel.querySelector(".six8-carousel-track");
    const slides = carousel.querySelectorAll(".six8-carousel-slide");
    const btnNext = carousel.querySelector(".six8-btn-next");
    const btnPrev = carousel.querySelector(".six8-btn-prev");

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
      slides.forEach((slide) => slide.classList.remove("active"));
      slides[currentSlide].classList.add("active");
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
      btnNext.addEventListener("click", () => {
        nextSlide();
        startAutoPlay();
      });

      btnPrev.addEventListener("click", () => {
        prevSlide();
        startAutoPlay();
      });
    }

    // Pause auto-play when hovering
    carousel.addEventListener("mouseenter", () =>
      clearInterval(autoPlayInterval),
    );
    carousel.addEventListener("mouseleave", startAutoPlay);

    // Initialize AutoPlay
    if (slides.length > 1) {
      startAutoPlay();
    }
  });
});


