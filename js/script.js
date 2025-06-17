document.addEventListener("DOMContentLoaded", () => {
  // --- Parallax Effect for Hero ---
  const hero = document.querySelector(".hero");
  if (hero) {
    window.addEventListener("scroll", () => {
      const scrollPosition = window.pageYOffset;
      // Adjust the '0.5' to change the parallax speed
      // Ensure background-attachment: fixed is NOT set in CSS if using this JS parallax
      // For now, we are using background-attachment: fixed which is simpler.
      // If you want more control, remove 'background-attachment: fixed' from .hero
      // and uncomment the line below:
      // hero.style.backgroundPositionY = scrollPosition * 0.7 + 'px';
    });
  }

  // --- Scroll-Triggered Animations ---
  const animatables = document.querySelectorAll(".animatable");
  const observerOptions = {
    root: null, // relative to document viewport
    rootMargin: "0px",
    threshold: 0.1, // 10% of item visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        // Optional: unobserve after animation to save resources
        // observer.unobserve(entry.target);
      } else {
        // Optional: remove class if you want animation to replay on scroll up
        // entry.target.classList.remove('is-visible');
      }
    });
  }, observerOptions);

  animatables.forEach((el) => {
    observer.observe(el);
  });

  // --- Active Navigation Link ---
  // (Simple version based on current page URL)
  const navLinks = document.querySelectorAll("header nav a");
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href").split("/").pop();
    if (linkPage === currentPage) {
      link.classList.add("active");
    }
  });

  // --- Dropdown Menu Accessibility (Optional basic keyboard nav) ---
  const dropdowns = document.querySelectorAll("nav li.dropdown");
  dropdowns.forEach((dropdown) => {
    const link = dropdown.querySelector("a");
    const menu = dropdown.querySelector(".dropdown-menu");

    link.addEventListener("focus", () => {
      // menu.style.display = 'block'; // Or add a class
    });
    // More complex logic needed for full keyboard nav, e.g. Esc to close
  });
});
