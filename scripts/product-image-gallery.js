document.addEventListener('DOMContentLoaded', () => {
    const thumbItems = document.querySelectorAll('.thumb-item');
    const mainImage = document.querySelector('.main-image-wrapper img');
    const productBadge = document.querySelector('.product-badge');

    if (thumbItems.length === 0 || !mainImage) return;

    thumbItems.forEach(item => {
        item.addEventListener('click', () => {
            // 1. Swap the active border
            thumbItems.forEach(t => t.classList.remove('active'));
            item.classList.add('active');

            // 2. Update the main image source and alt text
            const newSrc = item.getAttribute('data-full-image');
            const thumbImg = item.querySelector('img');
            mainImage.src = newSrc;
            mainImage.alt = thumbImg.alt;

            // 3. Dynamically update the badge text to match the thumbnail label
            if (productBadge) {
                const labelText = item.querySelector('.thumb-label').innerText.toUpperCase();
                productBadge.innerHTML = `<span class="badge-dot"></span> HEMGUARD® / ${labelText}`;
            }
        });
    });
});