// Wait for the HTML document to fully load
document.addEventListener("DOMContentLoaded", function() {
    
    // Scroll reveal animations
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
    checkScroll(); // Run on load

});