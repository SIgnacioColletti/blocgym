// MENÚ HAMBURGUESA
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("active");
});

// Cerrar menú al hacer click en un link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    hamburger.classList.remove("active");
  });
});

// NAVBAR TRANSPARENTE AL SCROLL
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

  // Crear mensaje para WhatsApp
  const textoWhatsApp = `Hola! Mi nombre es ${nombre}.%0A%0AEmail: ${email}%0ATel: ${telefono}%0A%0AMensaje: ${mensaje}`;

  // Abrir WhatsApp con el mensaje
  window.open(`https://wa.me/5493412563609?text=${textoWhatsApp}`, "_blank");

  // Limpiar formulario
  contactForm.reset();

  // Mostrar alerta
  alert(
    "¡Gracias! Te estamos redirigiendo a WhatsApp para completar tu consulta."
  );
});

// SMOOTH SCROLL PARA TODOS LOS LINKS
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

// Observar todas las cards
document
  .querySelectorAll(".card, .team-card, .pricing-card, .gallery-item")
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
