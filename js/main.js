(function () {
  "use strict";

  const header = document.querySelector(".site-header");
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  const contactForm = document.getElementById("contact-form");
  const formNote = document.getElementById("form-note");

  // Sticky header background on scroll
  function handleScroll() {
    if (window.scrollY > 60) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  // Mobile navigation
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.classList.toggle("active", isOpen);
    navToggle.setAttribute("aria-expanded", isOpen);
    navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.classList.remove("active");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open menu");
    });
  });

  // Scroll reveal
  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  const video = document.getElementById("platformVideo");
  const section = document.getElementById("platform");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          video.currentTime = 0;
          video.play().catch(() => {});
        } else {
          video.pause();
          video.currentTime = 0;
        }
      });
    },
    {
      threshold: 0.5,
    },
  );

  observer.observe(section);

  const muteBtn = document.getElementById("muteBtn");

  const icon = muteBtn.querySelector("i");

  muteBtn.addEventListener("click", () => {
    video.muted = !video.muted;

    if (video.muted) {
      icon.className = "fa-solid fa-volume-xmark";
      muteBtn.setAttribute("aria-label", "Unmute video");
    } else {
      icon.className = "fa-solid fa-volume-high";
      muteBtn.setAttribute("aria-label", "Mute video");

      video.play().catch(() => {});
    }
  });
})();
