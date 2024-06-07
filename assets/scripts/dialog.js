// Seleccionar todos los elementos modales, botones de abrir y botones de cerrar por clase
const modals = document.querySelectorAll(".modalContainer, .modalContainerNav");
const botonesAbrir = document.querySelectorAll(
  ".botonAbrirModal, .botonAbrirModalNav"
);
const botonesCerrar = document.querySelectorAll(".botonCerrarModal");

// Iterar sobre cada botón de abrir modal y agregar el event listener correspondiente
botonesAbrir.forEach((botonAbrir, index) => {
  botonAbrir.addEventListener("click", () => {
    const modal = index < modals.length ? modals[index] : null; // Seleccionar el modal correspondiente al botón actual
    if (modal) {
      modal.showModal();
      document.body.style.overflow = "hidden";

      // Restablecer la animación para los modales de navegación
      if (modal.classList.contains("modalContainerNav")) {
        modal.style.animation = "myAnimDialogNav 0.6s ease forwards";
      }
    }
  });
});

// Iterar sobre cada botón de cerrar modal y agregar el event listener correspondiente
botonesCerrar.forEach((botonCerrar) => {
  botonCerrar.addEventListener("click", () => {
    const modal = botonCerrar.closest(".modalContainer, .modalContainerNav"); // Buscar el modal padre del botón de cerrar
    if (modal) {
      modal.style.animation = "myAnim 0.4s forwards";
      setTimeout(function () {
        modal.close();
        modal.style.animation = "";
        document.body.style.overflow = "auto";
      }, 500);
    }
  });
});

// Agregar event listener para cerrar el modal haciendo clic fuera del mismo
modals.forEach((modal) => {
  modal.addEventListener("click", (e) => {
    const dialogDimensions = modal.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      modal.style.animation = "myAnim 0.5s forwards";
      setTimeout(function () {
        modal.close();
        modal.style.animation = "";
        document.body.style.overflow = "auto";
      }, 500);
    }
  });
});

// Añadir clase .modalNav a los modals de navegación
modals.forEach((modal) => {
  if (modal.classList.contains("modalContainerNav")) {
    modal.classList.add("modalNav");
  }
});
