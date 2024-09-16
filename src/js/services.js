document.addEventListener("DOMContentLoaded", function () {
    const serviceItems = document.querySelectorAll(".service-item");

    serviceItems.forEach(item => {
        item.addEventListener("click", function () {
            this.classList.toggle("active");
        });
    });
});