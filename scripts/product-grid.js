document.addEventListener("DOMContentLoaded", () => {
  // 1. Target the empty grid container
  const productGrid = document.getElementById("product-grid");

  // If we aren't on the shop page, stop the script here
  if (!productGrid) return;

  // 2. Fetch the JSON data
  fetch("./data/products.json")
    .then((response) => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    })
    .then((products) => {
      let htmlContent = "";

      // 3. Loop through each product and build the HTML
      products.forEach((product, index) => {
        // Calculate dynamic animation delay (100, 200, 300 in a loop)
        const delay = ((index % 3) + 1) * 100;

        htmlContent += `
                  
    <a href="${product.url}" class="product-card six8-animate six8-fade-up six8-delay-${delay}" style="text-decoration: none; color: inherit;">
        <div class="product-image">
            <div class="product-badge font-giest-mono">
                <span class="badge-dot"></span> ${product.badge}
            </div>
            <img src="${product.image}" alt="${product.title}">
        </div>
        
        <div class="product-meta font-giest-mono text-muted">${product.category}</div>
        <h3 class="product-title">${product.title}</h3>
        <p class="product-excerpt">${product.excerpt}</p>
        
        <div class="product-actions">
            <div class="action-left">
                <span class="product-price font-giest-mono" style="font-weight: 800; font-size: 1.1rem; color: var(--text-dark); margin-right: 12px;">
                    ${product.price}
                </span>
                
                <button class="btn btn-outline-dark-border">${product.buttonText}</button>
            </div>
            <span class="action-note font-giest-mono text-muted">${product.note}</span>
        </div>
    </a>

                `;
      });

      // 4. Inject the built HTML into the container
      productGrid.innerHTML = htmlContent;

      // 5. IMPORTANT: Re-trigger your scroll animations
      // If you are using an IntersectionObserver in global-script.js for the .six8-animate classes,
      // you need to re-run it here so it detects the newly injected product cards.
      if (typeof initScrollAnimations === "function") {
        initScrollAnimations();
      }
    })
    .catch((error) => console.error("Error loading products:", error));
});
