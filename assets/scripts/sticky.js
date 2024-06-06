function handleScroll() {
  const isSticky = window.scrollY > 200;
  applyStickyStyles(isSticky);
}

function applyStickyStyles(isSticky) {
  const nav = document.querySelector(".nav");
  const headerTitle = document.querySelector(".headerTitle");
  const botonAbrirModalNav = document.querySelector(".botonAbrirModalNav");
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

  // Cambiar dinámicamente los estilos del botón según el estado sticky
  if (isSticky) {
    botonAbrirModalNav.style.color = "#dadadd";
    botonAbrirModalNav.style.backgroundColor = "#0e0700";
    iconInicio.src = "assets/img/icons/inicioVacioBlanco.svg"; 
    iconCarrito.src = "assets/img/icons/cart-white.svg"; 
  } else {
    botonAbrirModalNav.style.color = "#0e0700"; 
    botonAbrirModalNav.style.backgroundColor = "#dadadd";
    iconInicio.src = "assets/img/icons/inicioVacio.svg"; 
    iconCarrito.src = "assets/img/icons/cart-black.svg"; 
  }
}

window.addEventListener("scroll", handleScroll);
