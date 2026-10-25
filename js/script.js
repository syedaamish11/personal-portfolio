// Personal Portfolio - Interactive Scripts
document.addEventListener("DOMContentLoaded", () => {
  // 1. Dynamic year in footer
  const yearSpan = document.getElementById("current-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 2. Mobile Menu Toggle
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navToggle.classList.toggle("open");
      navMenu.classList.toggle("open");
    });

    // Close menu when clicking any nav link
    navMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navToggle.classList.remove("open");
        navMenu.classList.remove("open");
      });
    });
  }

  // 3. Active Nav Link on Scroll (Intersection Observer)
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -70% 0px",
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach(link => {
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  // 4. Copy Email to Clipboard with Toast Notification
  const copyBtn = document.getElementById("copy-email-btn");
  const toast = document.getElementById("toast");

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }

  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      const email = copyBtn.getAttribute("data-email") || "aamishahmed62@gmail.com";
      try {
        await navigator.clipboard.writeText(email);
        showToast(`Copied to clipboard: ${email}`);
      } catch (err) {
        // Fallback for older browsers
        const textarea = document.createElement("textarea");
        textarea.value = email;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        showToast(`Copied to clipboard: ${email}`);
      }
    });
  }

  // 5. Back to Top Button
  const backToTopBtn = document.getElementById("back-to-top");
  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add("visible");
      } else {
        backToTopBtn.classList.remove("visible");
      }
    });

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }
});