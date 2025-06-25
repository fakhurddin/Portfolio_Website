document.addEventListener("DOMContentLoaded", function () {
  // ==========================
  // SMOOTH SCROLL ON ANCHOR CLICK
  // ==========================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      // Skip if link has class 'no-smooth-scroll'
      if (this.classList.contains("no-smooth-scroll")) return;

      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Adjust for fixed header height
          behavior: "smooth"
        });
      }
    });
  });
});
