document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Scroll reveal animations
    let reveals = document.querySelectorAll(".reveal");

    function checkScroll() {
        for (let i = 0; i < reveals.length; i++) {
            let windowHeight = window.innerHeight;
            let elementTop = reveals[i].getBoundingClientRect().top;
            let elementVisible = 100;

            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add("active");
            }
        }
    }

    window.addEventListener("scroll", checkScroll);
    checkScroll(); 

    // 2. FULLSCREEN GALLERY LOGIC
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.getElementById('closeLightbox');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let currentImageIndex = 0;
    let imageSources = [];

    // Collect all image paths so we can scroll through them
    galleryItems.forEach(function(img) {
        imageSources.push(img.src);
    });

    // Open Lightbox when an image is clicked
    galleryItems.forEach(function(img, index) {
        img.parentElement.addEventListener('click', function() {
            currentImageIndex = index;
            lightboxImg.src = imageSources[currentImageIndex];
            lightbox.classList.add('active');
        });
    });

    // Close Lightbox
    closeBtn.addEventListener('click', function() {
        lightbox.classList.remove('active');
    });

    // Next Image
    nextBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex + 1) % imageSources.length;
        lightboxImg.src = imageSources[currentImageIndex];
    });

    // Previous Image
    prevBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex - 1 + imageSources.length) % imageSources.length;
        lightboxImg.src = imageSources[currentImageIndex];
    });

    // Keyboard Controls (Arrows & Escape)
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return; // Only run if lightbox is open
        
        if (e.key === 'Escape') {
            lightbox.classList.remove('active');
        } 
        else if (e.key === 'ArrowRight') {
            currentImageIndex = (currentImageIndex + 1) % imageSources.length;
            lightboxImg.src = imageSources[currentImageIndex];
        } 
        else if (e.key === 'ArrowLeft') {
            currentImageIndex = (currentImageIndex - 1 + imageSources.length) % imageSources.length;
            lightboxImg.src = imageSources[currentImageIndex];
        }
    });

    // Close if user clicks the dark background (but not the image itself)
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });

});
