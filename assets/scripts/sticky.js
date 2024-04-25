function handleScroll() {
  const isSticky = window.scrollY > 200;
  applyStickyStyles(isSticky);
}

function applyStickyStyles(isSticky) {
  const nav = document.querySelector(".nav");
  const headerTitle = document.querySelector(".headerTitle");
  const botonAbrirModalNav = document.querySelector(".botonAbrirModalNav");

  nav.classList.toggle("sticky", isSticky);

  headerTitle.classList.toggle("headerSticky", isSticky);

  const underlineHovers = document.querySelectorAll(".underlined-hover");
  underlineHovers.forEach((underlineHover) => {
    underlineHover.style.setProperty("--colorFont", isSticky ? "#fff" : "#000");
  });

  // Cambiar dinámicamente los estilos del botón según el estado sticky
  if (isSticky) {
    botonAbrirModalNav.style.color = "#fff";
    botonAbrirModalNav.style.backgroundColor = "#0e0700";
  } else {
    botonAbrirModalNav.style.color = "#0e0700"; // Restablecer a valor predeterminado
    botonAbrirModalNav.style.backgroundColor = "#fff"; // Restablecer a valor predeterminado
  }
}

window.addEventListener("scroll", handleScroll);
