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