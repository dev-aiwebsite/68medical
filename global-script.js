function switchSlide(slideIndex) {
  const slides = document.querySelectorAll(".slide");
  slides.forEach((slide) => slide.classList.remove("active"));

  document.getElementById("slide" + slideIndex).classList.add("active");
}

document.addEventListener("DOMContentLoaded", () => {
  // Set up the Intersection Observer
  const animationObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        // If the element is in view
        if (entry.isIntersecting) {
          entry.target.classList.add("six8-visible");
          // Unobserve the element so it only animates once
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  // Find all elements with the specific six8-animate class
  const animatedElements = document.querySelectorAll(".six8-animate");

  // Observe each element
  animatedElements.forEach((el) => animationObserver.observe(el));
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


