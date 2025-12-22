// ============================================
// NAVIGATION - Menu Toggle
// ============================================
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");

    // Animate hamburger icon
    const spans = menuToggle.querySelectorAll("span");
    if (navMenu.classList.contains("active")) {
      spans[0].style.transform = "rotate(45deg) translateY(8px)";
      spans[1].style.opacity = "0";
      spans[2].style.transform = "rotate(-45deg) translateY(-8px)";
    } else {
      spans[0].style.transform = "none";
      spans[1].style.opacity = "1";
      spans[2].style.transform = "none";
    }
  });
}

// Close menu when clicking on a link
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (navMenu.classList.contains("active")) {
      navMenu.classList.remove("active");
      const spans = menuToggle.querySelectorAll("span");
      spans[0].style.transform = "none";
      spans[1].style.opacity = "1";
      spans[2].style.transform = "none";
    }
  });
});

// ============================================
// NAVIGATION - Scroll Effect
// ============================================
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.style.padding = "0.5rem 0";
    navbar.style.backgroundColor = "rgba(10, 10, 10, 0.98)";
  } else {
    navbar.style.padding = "1rem 0";
    navbar.style.backgroundColor = "rgba(10, 10, 10, 0.95)";
  }
});

// ============================================
// SMOOTH SCROLLING
// ============================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const navbarHeight = document.querySelector(".navbar").offsetHeight;
      const targetPosition = target.offsetTop - navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// ============================================
// FORM VALIDATION & SUBMISSION
// ============================================
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form values
    const formData = {
      nombre: document.getElementById("nombre").value,
      email: document.getElementById("email").value,
      telefono: document.getElementById("telefono").value,
      programa: document.getElementById("programa").value,
      mensaje: document.getElementById("mensaje").value,
    };

    // Basic validation
    if (
      !formData.nombre ||
      !formData.email ||
      !formData.telefono ||
      !formData.programa
    ) {
      showNotification(
        "Por favor completá todos los campos obligatorios",
        "error"
      );
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showNotification("Por favor ingresá un email válido", "error");
      return;
    }

    // Phone validation (basic)
    const phoneRegex = /^[0-9\s\-\+\(\)]+$/;
    if (!phoneRegex.test(formData.telefono)) {
      showNotification("Por favor ingresá un teléfono válido", "error");
      return;
    }

    // Simulate form submission
    const submitButton = contactForm.querySelector(".btn-submit");
    const originalText = submitButton.textContent;
    submitButton.textContent = "Enviando...";
    submitButton.disabled = true;

    // Simulate API call
    setTimeout(() => {
      console.log("Form Data:", formData);

      // Redirect to WhatsApp with pre-filled message
      const whatsappMessage = `Hola! Me gustaría solicitar una clase gratis.
            
Nombre: ${formData.nombre}
Email: ${formData.email}
Teléfono: ${formData.telefono}
Programa: ${formData.programa}
${formData.mensaje ? `Mensaje: ${formData.mensaje}` : ""}`;

      const whatsappURL = `https://wa.me/5493413000000?text=${encodeURIComponent(
        whatsappMessage
      )}`;

      showNotification(
        "¡Formulario enviado! Redirigiendo a WhatsApp...",
        "success"
      );

      setTimeout(() => {
        window.open(whatsappURL, "_blank");
        contactForm.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      }, 1500);
    }, 1000);
  });
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: ${
          type === "success"
            ? "#10b981"
            : type === "error"
            ? "#ef4444"
            : "#3b82f6"
        };
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 350px;
        font-weight: 600;
    `;

  document.body.appendChild(notification);

  // Remove after 4 seconds
  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.3s ease";
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 4000);
}

// Add animation keyframes
const style = document.createElement("style");
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// SCROLL ANIMATIONS
// ============================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll(
  ".program-card, .trainer-card, .result-card, .pricing-card, .contact-info-card"
);
animateElements.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(el);
});

// ============================================
// COUNTER ANIMATION (for stats)
// ============================================
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current);
  }, 16);
}

// ============================================
// PRICING CARD HIGHLIGHT
// ============================================
const pricingCards = document.querySelectorAll(".pricing-card");
pricingCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    pricingCards.forEach((c) => {
      if (c !== card) {
        c.style.opacity = "0.7";
      }
    });
  });

  card.addEventListener("mouseleave", () => {
    pricingCards.forEach((c) => {
      c.style.opacity = "1";
    });
  });
});

// ============================================
// LAZY LOADING IMAGES
// ============================================
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.add("loaded");
        observer.unobserve(img);
      }
    });
  });

  const images = document.querySelectorAll("img[data-src]");
  images.forEach((img) => imageObserver.observe(img));
}

// ============================================
// PARALLAX EFFECT (Hero Section)
// ============================================
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero");
  if (hero) {
    hero.style.backgroundPositionY = scrolled * 0.5 + "px";
  }
});

// ============================================
// ACTIVE NAVIGATION LINK
// ============================================
window.addEventListener("scroll", () => {
  let current = "";
  const sections = document.querySelectorAll("section[id]");

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 100) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// ============================================
// INITIALIZE ON LOAD
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  console.log("BLOC Gym Website Loaded Successfully! 💪");

  // Add fade-in animation to body
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease";
    document.body.style.opacity = "1";
  }, 100);
});

// ============================================
// PREVENT FORM RESUBMISSION ON REFRESH
// ============================================
if (window.history.replaceState) {
  window.history.replaceState(null, null, window.location.href);
}

// ============================================
// SCROLL TO TOP BUTTON (Optional)
// ============================================
const scrollToTopButton = document.createElement("button");
scrollToTopButton.innerHTML = "↑";
scrollToTopButton.className = "scroll-to-top";
scrollToTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: var(--primary-yellow);
    color: var(--dark-bg);
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

document.body.appendChild(scrollToTopButton);

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    scrollToTopButton.style.opacity = "1";
    scrollToTopButton.style.visibility = "visible";
  } else {
    scrollToTopButton.style.opacity = "0";
    scrollToTopButton.style.visibility = "hidden";
  }
});

scrollToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// ============================================
// PERFORMANCE MONITORING (Development)
// ============================================
if (window.performance) {
  window.addEventListener("load", () => {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(`Page Load Time: ${pageLoadTime}ms`);
  });
}

// ============================================
// ERROR HANDLING
// ============================================
window.addEventListener("error", (e) => {
  console.error("Error occurred:", e.error);
});

// ============================================
// RESIZE HANDLER
// ============================================
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // Handle any resize-specific logic here
    console.log("Window resized");
  }, 250);
});
