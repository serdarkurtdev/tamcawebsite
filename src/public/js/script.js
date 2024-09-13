// script.js
document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger");
    const navItems = document.querySelector(".nav-items");
    const hamburgerIcon = document.querySelector(".hamburger i");
  
    hamburger.addEventListener("click", function () {
      navItems.classList.toggle("active");
  
      // Toggle between hamburger bars and "X" icon
      if (navItems.classList.contains("active")) {
        hamburgerIcon.classList.remove("fa-bars");
        hamburgerIcon.classList.add("fa-times");
      } else {
        hamburgerIcon.classList.remove("fa-times");
        hamburgerIcon.classList.add("fa-bars");
      }
    });
  });

// script.js
let index = 0;

function showSlide(n) {
    const slides = document.querySelectorAll('.carousel-item');
    if (n >= slides.length) index = 0;
    if (n < 0) index = slides.length - 1;
    slides.forEach((slide, i) => {
        slide.style.transform = `translateX(${-(index * 100)}%)`;
    });
}

function nextSlide() {
    index++;
    showSlide(index);
}

function prevSlide() {
    index--;
    showSlide(index);
}

// Initialize the carousel
showSlide(index);

// Optionally, you can also add automatic sliding:
setInterval(nextSlide, 5000); // Change slide every 5 seconds
