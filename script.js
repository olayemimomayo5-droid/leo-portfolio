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
    const itemsToShow = 6; // How many to show per click

    loadMoreBtn.addEventListener('click', function() {
        // Show the next batch of projects
        for (let i = 0; i < itemsToShow; i++) {
            if (currentlyShown < hiddenProjects.length) {
                hiddenProjects[currentlyShown].classList.add('visible');
                currentlyShown++;
            }
        }

        // If all projects are shown, hide the "Load More" button
        if (currentlyShown >= hiddenProjects.length) {
            loadMoreBtn.classList.add('hidden');
        }
    });

    // 3. FULLSCREEN GALLERY LOGIC
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.getElementById('closeLightbox');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let currentImageIndex = 0;
    let imageSources = [];

    // Function to update the gallery list (called once on load, and after clicking load more)
    function updateGallery() {
        imageSources = [];
        galleryItems.forEach(function(img) {
            // Only add to gallery if the parent project is visible
            if(img.closest('.project-card').style.display !== 'none' && !img.closest('.project-card').classList.contains('hidden-project')) {
                if(!imageSources.includes(img.src)) {
                    imageSources.push(img.src);
                }
            }
        });
    }
    updateGallery(); // Initialize on load

    // Open Lightbox
    document.querySelectorAll('.gallery-item').forEach(function(item, index) {
        item.addEventListener('click', function(e) {
            // Prevent opening if clicking the "View Code" link
            if(e.target.tagName === 'A') return;

            updateGallery(); // Refresh list in case new items were loaded
            const clickedImg = item.querySelector('img');
            currentImageIndex = imageSources.indexOf(clickedImg.src);
            
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

    // Keyboard Controls
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

    // Close if clicking the background
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });

});
