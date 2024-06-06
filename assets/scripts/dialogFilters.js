let modal = document.getElementById('modalContainer');
let botonAbrirModal = document.getElementById('botonAbrirModal');
let botonCerrarModal = document.getElementById('botonCerrarModal');

botonAbrirModal.addEventListener('click', () => {
    modal.showModal();
});

botonCerrarModal.addEventListener('click', () => {
    modal.classList.add('closing');
    modal.addEventListener('animationend', () => {
        modal.classList.remove('closing');
        modal.close();
    }, { once: true });
});

modal.addEventListener('click', e => {
    const dialogDimensions = modal.getBoundingClientRect();
    if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
    ) {
        modal.classList.add('closing');
        modal.addEventListener('animationend', () => {
            modal.classList.remove('closing');
            modal.close();
        }, { once: true });
    }
});

// Añade las animaciones CSS
const style = document.createElement('style');
style.innerHTML = `
@keyframes filterModalExitAnimation {
  0% {
    opacity: 1;
    transform: translateX(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-50px);
  }
}

#modalContainer.closing {
  animation: filterModalExitAnimation 0.5s ease-in-out forwards;
}
`;
document.head.appendChild(style);
