// Seleccionar todos los elementos modales, botones de abrir y botones de cerrar por clase
const modals = document.querySelectorAll(".modalContainer");
const botonesAbrirModal = document.querySelectorAll(".botonAbrirModal");
const botonesCerrarModal = document.querySelectorAll(".botonCerrarModal");


// Iterar sobre cada botón de abrir modal y agregar el event listener correspondiente
botonesAbrirModal.forEach((botonAbrir, index) => {
  const modal = modals[index]; // Seleccionar el modal correspondiente al botón actual
  botonAbrir.addEventListener("click", () => {
    modal.showModal();

  });
});

// Iterar sobre cada botón de cerrar modal y agregar el event listener correspondiente
botonesCerrarModal.forEach((botonCerrar) => {
  botonCerrar.addEventListener("click", () => {
    const modal = botonCerrar.closest(".modalContainer"); // Buscar el modal padre del botón de cerrar
    modal.close();

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
      modal.close();

    }
  });
});
