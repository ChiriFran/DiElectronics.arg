let modal = document.getElementById('modalContainer');

let botonAbrirModal = document.getElementById('botonAbrirModal');

let botonCerrarModal = document.getElementById('botonCerrarModal');

botonAbrirModal.addEventListener('click', () => {
    modal.showModal();
})


botonCerrarModal.addEventListener('click', () => {
    modal.close();
})

modal.addEventListener('click', e => {
    const dialogDimensions = modal.getBoundingClientRect()
    if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
    ) {
        modal.close()
    }
})
