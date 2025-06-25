document.addEventListener("DOMContentLoaded", function () {
  // ===== ELEMENTS =====
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const navLinks = document.querySelectorAll("nav a:not(#menu-toggle), #mobile-menu a");
  const body = document.body;

  // ===== STATE =====
  let isAnimating = false;

  // ===== MENU ANIMATION FUNCTIONS =====
  function openMenu() {
    if (isAnimating || mobileMenu.classList.contains("open")) return;
    isAnimating = true;

    // Prepare for animation
    mobileMenu.style.display = "block";
    mobileMenu.style.maxHeight = "0";
    mobileMenu.style.opacity = "0";
    void mobileMenu.offsetHeight; // Force layout

    // Trigger open animation
    mobileMenu.classList.add("open");
    menuToggle.classList.add("active");
    body.classList.add("no-scroll");

    // Final animated state
    mobileMenu.style.maxHeight = "600px";
    mobileMenu.style.opacity = "1";

    // Finish animation
    setTimeout(() => {
      isAnimating = false;
    }, 800); // Match with CSS transition
  }

  function closeMenu() {
    if (isAnimating || !mobileMenu.classList.contains("open")) return;
    isAnimating = true;

    // Trigger close animation
    mobileMenu.style.maxHeight = "0";
    mobileMenu.style.opacity = "0";
    mobileMenu.classList.remove("open");
    menuToggle.classList.remove("active");

    // Cleanup after animation
    setTimeout(() => {
      mobileMenu.style.display = "none";
      body.classList.remove("no-scroll");
      isAnimating = false;
    }, 800); // Match with CSS transition
  }

  // ===== EVENT HANDLERS =====
  menuToggle.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    mobileMenu.classList.contains("open") ? closeMenu() : openMenu();
  });

  function handleLinkClick(e) {
    if (!mobileMenu.classList.contains("open")) return;

    e.preventDefault();
    const targetId = e.currentTarget.getAttribute("href");
    closeMenu();

    // Delay scroll to match menu close animation
    setTimeout(() => {
      if (targetId.startsWith("#")) {
        const target = document.querySelector(targetId);
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 80,
            behavior: "smooth"
          });
          history.pushState(null, null, targetId);
        }
      } else {
        window.location.href = targetId;
      }
    }, 800);
  }

  // ===== EVENT LISTENERS =====
  navLinks.forEach(link => link.addEventListener("click", handleLinkClick));

  document.addEventListener("click", function (e) {
    if (
      mobileMenu.classList.contains("open") &&
      !e.target.closest("#mobile-menu") &&
      !e.target.closest("#menu-toggle")
    ) {
      closeMenu();
    }
  });

  // ===== SCROLL EFFECTS =====
  const nav = document.querySelector("nav");
  if (nav) {
    window.addEventListener("scroll", function () {
      nav.classList.toggle("scrolled", window.scrollY > 50);
    });
  }
});
