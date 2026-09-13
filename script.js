/* =========================================================
   PORTAFOLIO CARMEN ELENA CORDERO PERALTA — script.js
   Menú móvil, scroll suave, animaciones al hacer scroll
   y lightbox de la galería.
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  /* ---------------------------------------------------------
     1. MENÚ MÓVIL (HAMBURGUESA)
     --------------------------------------------------------- */
  var hamburger = document.getElementById("hamburger");
  var navMenu = document.getElementById("nav-menu");

  function cerrarMenu() {
    hamburger.classList.remove("abierto");
    navMenu.classList.remove("abierto");
    hamburger.setAttribute("aria-expanded", "false");
  }

  function alternarMenu() {
    var estaAbierto = navMenu.classList.toggle("abierto");
    hamburger.classList.toggle("abierto", estaAbierto);
    hamburger.setAttribute("aria-expanded", estaAbierto ? "true" : "false");
  }

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", alternarMenu);

    /* Cerrar el menú al seleccionar un enlace (scroll suave a la sección) */
    var enlacesNav = navMenu.querySelectorAll(".nav-link");
    enlacesNav.forEach(function (enlace) {
      enlace.addEventListener("click", cerrarMenu);
    });
  }

  /* ---------------------------------------------------------
     2. ANIMACIÓN DE APARICIÓN AL HACER SCROLL
     --------------------------------------------------------- */
  var elementosRevelados = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    var observador = new IntersectionObserver(
      function (entradas) {
        entradas.forEach(function (entrada) {
          if (entrada.isIntersecting) {
            entrada.target.classList.add("visible");
            observador.unobserve(entrada.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    elementosRevelados.forEach(function (elemento) {
      observador.observe(elemento);
    });
  } else {
    /* Navegadores sin soporte: mostrar todo directamente */
    elementosRevelados.forEach(function (elemento) {
      elemento.classList.add("visible");
    });
  }

  /* ---------------------------------------------------------
     3. LIGHTBOX / MODAL DE LA GALERÍA
     --------------------------------------------------------- */
  var lightbox = document.getElementById("lightbox");
  var lightboxImagen = document.getElementById("lightbox-imagen");
  var lightboxCerrar = document.getElementById("lightbox-cerrar");
  var itemsGaleria = document.querySelectorAll(".galeria-item");

  function abrirLightbox(rutaImagen, textoAlt) {
    lightboxImagen.src = rutaImagen;
    lightboxImagen.alt = textoAlt;
    lightbox.classList.add("abierto");
    document.body.style.overflow = "hidden";
  }

  function cerrarLightbox() {
    lightbox.classList.remove("abierto");
    document.body.style.overflow = "";
    lightboxImagen.src = "";
  }

  itemsGaleria.forEach(function (item) {
    item.addEventListener("click", function () {
      var img = item.querySelector("img");
      abrirLightbox(item.getAttribute("data-imagen"), img ? img.alt : "");
    });
  });

  if (lightboxCerrar) {
    lightboxCerrar.addEventListener("click", cerrarLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener("click", function (evento) {
      if (evento.target === lightbox) {
        cerrarLightbox();
      }
    });
  }

  document.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape" && lightbox.classList.contains("abierto")) {
      cerrarLightbox();
    }
  });

  /* ---------------------------------------------------------
     4. AÑO ACTUAL EN EL PIE DE PÁGINA
     --------------------------------------------------------- */
  var anioActual = document.getElementById("anio-actual");
  if (anioActual) {
    anioActual.textContent = new Date().getFullYear();
  }

});
