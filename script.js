// Menu Toggle Mobile
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");

  // Animar hamburguesa
  const spans = menuToggle.querySelectorAll("span");
  if (navMenu.classList.contains("active")) {
    spans[0].style.transform = "rotate(45deg) translate(7px, 7px)";
    spans[1].style.opacity = "0";
    spans[2].style.transform = "rotate(-45deg) translate(7px, -7px)";
  } else {
    spans[0].style.transform = "none";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "none";
  }
});

// Cerrar menu al hacer click en un link
const navLinks = document.querySelectorAll(".nav-menu a");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    const spans = menuToggle.querySelectorAll("span");
    spans[0].style.transform = "none";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "none";
  });
});

// Smooth Scroll para navegación
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offsetTop = target.offsetTop - 80; // Altura del navbar
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// Navbar transparente/sólido al hacer scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(0, 0, 0, 0.98)";
  } else {
    navbar.style.background = "rgba(0, 0, 0, 0.95)";
  }
});

// Formulario de Contacto
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const submitButton = contactForm.querySelector('button[type="submit"]');
  const originalButtonText = submitButton.textContent;

  // Obtener datos del formulario
  const formData = {
    nombre: document.getElementById("nombre").value,
    email: document.getElementById("email").value,
    telefono: document.getElementById("telefono").value,
    programa: document.getElementById("programa").value,
    mensaje: document.getElementById("mensaje").value,
  };

  // Validación básica
  if (
    !formData.nombre ||
    !formData.email ||
    !formData.telefono ||
    !formData.programa
  ) {
    alert("Por favor completá todos los campos obligatorios.");
    return;
  }

  // Validar email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    alert("Por favor ingresá un email válido.");
    return;
  }

  // Cambiar botón a estado "enviando"
  submitButton.textContent = "Enviando...";
  submitButton.disabled = true;

  try {
    // IMPORTANTE: Reemplazar con tu endpoint de Formspree
    // Crealo en https://formspree.io - es gratis
    const formspreeEndpoint = "https://formspree.io/f/YOUR_FORM_ID";

    const response = await fetch(formspreeEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      // Éxito
      alert("¡Mensaje enviado! Te contactaremos en menos de 24hs. 💪");
      contactForm.reset();

      // Redirigir a WhatsApp (opcional)
      const whatsappMessage = encodeURIComponent(
        `Hola! Me llamo ${formData.nombre}. Quiero información sobre ${formData.programa}.`
      );
      // window.location.href = `https://wa.me/5493413000000?text=${whatsappMessage}`;
    } else {
      throw new Error("Error al enviar");
    }
  } catch (error) {
    console.error("Error:", error);
    alert(
      "Hubo un error al enviar el mensaje. Por favor intentá de nuevo o contactanos por WhatsApp."
    );
  } finally {
    submitButton.textContent = originalButtonText;
    submitButton.disabled = false;
  }
});

// Animación al hacer scroll (Intersection Observer)
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

// Observar elementos para animación
document
  .querySelectorAll(
    ".program-card, .trainer-card, .transformation-card, .pricing-card"
  )
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    observer.observe(el);
  });

// Contador de visitas (opcional - guardar en localStorage)
let visitCount = localStorage.getItem("visitCount") || 0;
visitCount++;
localStorage.setItem("visitCount", visitCount);
console.log(`Visitas: ${visitCount}`);

// Google Analytics (agregar tu ID)
// window.dataLayer = window.dataLayer || [];
// function gtag(){dataLayer.push(arguments);}
// gtag('js', new Date());
// gtag('config', 'G-XXXXXXXXXX');

// Preloader opcional
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 0.3s";
    document.body.style.opacity = "1";
  }, 100);
});

// Prevenir zoom en mobile (opcional)
document.addEventListener("gesturestart", function (e) {
  e.preventDefault();
});

console.log(
  "%c💪 BLOC GIMNASIO 💪",
  "font-size: 20px; font-weight: bold; color: #FDB913;"
);
console.log(
  "%cEntrenamiento Personalizado - Rosario, Argentina",
  "font-size: 12px; color: #FFF;"
);
