function handleScroll() {
  const isSticky = window.scrollY > 200;
  applyStickyStyles(isSticky);
}

function applyStickyStyles(isSticky) {
  const nav = document.querySelector(".nav");
  const headerTitle = document.querySelector(".headerTitle");
  const botonAbrirModalNav = document.querySelector(".botonAbrirModalNav");
  const botonAbrirModalNavContacto = document.querySelector(".botonAbrirModalNavContacto");
  const iconNavBarMobile = document.getElementById("navBarMobile");
  const iconNavBarMobileTitle = document.getElementById("navBarMobileTitle");
  const iconInicio = document.querySelector(".iconInicio");
  const iconCarrito = document.querySelector(".iconCarrito");

  nav.classList.toggle("sticky", isSticky);
  headerTitle.classList.toggle("headerSticky", isSticky);
  iconNavBarMobile.classList.toggle("mobileSticky", isSticky);

  const visibility = isSticky ? "visible" : "hidden";
  const position = isSticky ? "relative" : "absolute";

  iconNavBarMobileTitle.style.visibility = visibility;
  iconNavBarMobileTitle.style.position = position;

  const underlineHovers = document.querySelectorAll(".underlined-hover");
  underlineHovers.forEach((underlineHover) => {
    underlineHover.style.setProperty("--colorFont", isSticky ? "#ededf2" : "#0e0700");
  });

  function aplicarEstilosBoton(boton, color, colorDeFondo) {
    boton.style.color = color;
    boton.style.backgroundColor = colorDeFondo;
  }

  if (isSticky) {
    aplicarEstilosBoton(botonAbrirModalNav, "#dadadd", "#0e0700");
    aplicarEstilosBoton(botonAbrirModalNavContacto, "#dadadd", "#0e0700");
    iconInicio.src = "assets/img/icons/inicioVacioBlanco.svg"; 
    iconCarrito.src = "assets/img/icons/cart-white.svg"; 
  } else {
    aplicarEstilosBoton(botonAbrirModalNav, "#0e0700", "#dadadd");
    aplicarEstilosBoton(botonAbrirModalNavContacto, "#0e0700", "#dadadd");
    iconInicio.src = "assets/img/icons/inicioVacio.svg"; 
    iconCarrito.src = "assets/img/icons/cart-black.svg"; 
  }
}

window.addEventListener("scroll", handleScroll);
