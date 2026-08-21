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

    // 2. LOAD MORE LOGIC
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const hiddenProjects = document.querySelectorAll('.hidden-project');
    let currentlyShown = 0;
    const itemsToShow = 6;

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            for (let i = 0; i < itemsToShow; i++) {
                if (currentlyShown < hiddenProjects.length) {
                    hiddenProjects[currentlyShown].classList.add('visible');
                    currentlyShown++;
                }
            }
            if (currentlyShown >= hiddenProjects.length) {
                loadMoreBtn.classList.add('hidden');
            }
        });
    }

    // 3. FULLSCREEN GALLERY LOGIC
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.getElementById('closeLightbox');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let currentImageIndex = 0;
    let imageSources = [];

    function updateGallery() {
        imageSources = [];
        galleryItems.forEach(function(item) {
            const img = item.querySelector('img');
            const card = item.closest('.project-card');
            if(img && !card.classList.contains('hidden-project')) {
                if(!imageSources.includes(img.src)) {
                    imageSources.push(img.src);
                }
            }
        });
    }
    updateGallery();

    galleryItems.forEach(function(item, index) {
        item.addEventListener('click', function(e) {
            const img = item.querySelector('img');
            updateGallery();
            currentImageIndex = imageSources.indexOf(img.src);
            lightboxImg.src = imageSources[currentImageIndex];
            lightbox.classList.add('active');
        });
    });

    closeBtn.addEventListener('click', function() {
        lightbox.classList.remove('active');
    });

    nextBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex + 1) % imageSources.length;
        lightboxImg.src = imageSources[currentImageIndex];
    });

    prevBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex - 1 + imageSources.length) % imageSources.length;
        lightboxImg.src = imageSources[currentImageIndex];
    });

    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
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

    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });

});
