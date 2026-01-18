// MENÚ HAMBURGUESA
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    hamburger.classList.remove("active");
  });
});

// NAVBAR CON SCROLL
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(0, 0, 0, 0.98)";
  } else {
    navbar.style.background = "rgba(0, 0, 0, 0.95)";
  }
});

// FORMULARIO DE CONTACTO
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;
  const telefono = document.getElementById("telefono").value;
  const mensaje = document.getElementById("mensaje").value;

  const textoWhatsApp = `Hola! Soy ${nombre}.%0A%0A📧 Email: ${email}%0A📱 Tel: ${telefono}%0A%0A💬 Mensaje: ${mensaje}`;

  window.open(`https://wa.me/5493412563609?text=${textoWhatsApp}`, "_blank");

  contactForm.reset();

  alert(
    "¡Perfecto! Te estamos redirigiendo a WhatsApp para confirmar tu clase gratis 🎉",
  );
});

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// ANIMACIÓN DE CONTEO DE NÚMEROS EN STATS
function animateNumbers() {
  const statNumbers = document.querySelectorAll(".stat-number");

  statNumbers.forEach((stat) => {
    const target = parseInt(stat.getAttribute("data-target"));
    const isPercent = stat.classList.contains("stat-percent");
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCount = () => {
      current += increment;

      if (current < target) {
        stat.textContent = Math.floor(current) + (isPercent ? "%" : "");
        stat.classList.add("counting");
        requestAnimationFrame(updateCount);
      } else {
        stat.textContent = target + (isPercent ? "%" : "");
        stat.classList.remove("counting");
      }
    };

    updateCount();
  });
}

// Observador para stats
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateNumbers();
        statsObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.5,
  },
);

const heroStats = document.querySelector(".hero-stats");
if (heroStats) {
  statsObserver.observe(heroStats);
}

// ANIMACIONES AL SCROLL
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

document
  .querySelectorAll(
    ".card, .team-card, .pricing-card, .gallery-item, .benefit-card, .testimonial-card",
  )
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.6s ease-out";
    observer.observe(el);
  });

// LAZY LOADING DE IMÁGENES
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

document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
  imageObserver.observe(img);
});

console.log("🏋️ BLOC Gym - Website cargado correctamente");
