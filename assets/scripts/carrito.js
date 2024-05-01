let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");
const contenedorRecibo = document.querySelector("#recibo");

function cargarProductosCarrito() {
  if (productosEnCarrito && productosEnCarrito.length > 0) {
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.remove("disabled");
    contenedorCarritoAcciones.classList.remove("disabled");
    contenedorCarritoComprado.classList.add("disabled");

    contenedorCarritoProductos.innerHTML = "";

    productosEnCarrito.forEach((producto) => {
      const div = document.createElement("div");
      div.classList.add("carrito-producto");
      div.innerHTML = `
                <img class="carrito-producto-imagen" src="${
                  producto.imagen
                }" alt="${producto.titulo}">
                <div class="carrito-producto-titulo">
                    <small>Título</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>$${producto.precio * producto.cantidad}</p>
                </div>
                <button class="carrito-producto-eliminar" id="${
                  producto.id
                }"><i class="bi bi-trash-fill"></i></button>
            `;

      contenedorCarritoProductos.append(div);
    });

    actualizarBotonesEliminar();
    actualizarTotal();
  } else {
    contenedorCarritoVacio.classList.remove("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.add("disabled");
  }
}

cargarProductosCarrito();

function actualizarBotonesEliminar() {
  botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

  botonesEliminar.forEach((boton) => {
    boton.addEventListener("click", eliminarDelCarrito);
  });
}

function eliminarDelCarrito(e) {
  Toastify({
    text: "Producto eliminado",
    duration: 3000,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #4b33a8, #785ce9)",
      borderRadius: "2rem",
      textTransform: "uppercase",
      fontSize: ".75rem",
    },
    offset: {
      x: "1.5rem", // horizontal axis - can be a number or a string indicating unity. eg: '2em'
      y: "1.5rem", // vertical axis - can be a number or a string indicating unity. eg: '2em'
    },
    onClick: function () {}, // Callback after click
  }).showToast();

  const idBoton = e.currentTarget.id;
  const index = productosEnCarrito.findIndex(
    (producto) => producto.id === idBoton
  );

  productosEnCarrito.splice(index, 1);
  cargarProductosCarrito();

  localStorage.setItem(
    "productos-en-carrito",
    JSON.stringify(productosEnCarrito)
  );
}

botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {
  Swal.fire({
    title: "¿Estás seguro?",
    icon: "question",
    html: `Se van a borrar ${productosEnCarrito.reduce(
      (acc, producto) => acc + producto.cantidad,
      0
    )} productos.`,
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText: "Sí",
    cancelButtonText: "No",
  }).then((result) => {
    if (result.isConfirmed) {
      productosEnCarrito.length = 0;
      localStorage.setItem(
        "productos-en-carrito",
        JSON.stringify(productosEnCarrito)
      );
      cargarProductosCarrito();
      generarRecibo(); // Actualizar el recibo después de vaciar el carrito
    }
  });
}

function actualizarTotal() {
  const totalCalculado = productosEnCarrito.reduce(
    (acc, producto) => acc + producto.precio * producto.cantidad,
    0
  );
  contenedorTotal.innerText = `$${totalCalculado}`;
}

botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {
  const fecha = new Date();
  const dia = fecha.getDate();
  const mes = fecha.getMonth() + 1; // Sumar 1 porque los meses empiezan en 0
  const año = fecha.getFullYear();
  const hora = fecha.getHours();
  const minutos = fecha.getMinutes();

  const numeroCompra = generarNumeroCompra();
  const letraAleatoria = String.fromCharCode(
    65 + Math.floor(Math.random() * 10)
  ); // Genera una letra aleatoria de la A a la J
  const numeroCompraConLetra = letraAleatoria + numeroCompra; // Agrega la letra al número de compra

  const totalCalculado = productosEnCarrito.reduce(
    (acc, producto) => acc + producto.precio * producto.cantidad,
    0
  );

  const reciboHTML = `
        <div class="reciboContainer">
          <div class="recibo">
              <h2 class ="reciboTitle">Recibo de pedido</h2>
              <p class="reciboId innerContent"><strong>Número de orden:</strong> #${numeroCompraConLetra}</p>
              <p class="reciboDate innerContent"><strong>Fecha:</strong> ${dia}/${mes}/${año}</p>
              <p class="reciboTime innerContent"><strong>Hora:</strong> ${hora}:${minutos}</p>
              <p class="reciboProdcutos innerContent"><strong>Productos:</strong></p>
              <ul>
                  ${productosEnCarrito
                    .map(
                      (producto) =>
                        `<li>${producto.titulo} - $${producto.precio} x ${producto.cantidad}</li>`
                    )
                    .join("")}
              </ul>
              <h3 class="reciboTotal"><strong>Total:</strong> $${totalCalculado}</h3>
              <p class ="reciboAviso">Valido por 5 dias ${dia}/${mes}/${año}</p>
            </div>
        </div>

        <div class="reciboFooter">
          <h4 class ="reciboFooterTitle">Este comprabante es un pedido de compra no un comprobante de pago.</h4>
          <h4 class ="reciboFooterName"> - dielectronics.arg - </h4>
        </div>
    `;

  contenedorRecibo.innerHTML = reciboHTML;
  contenedorRecibo.classList.remove("disabled");

  // Modificar el texto en el elemento con el id "carrito-vacio"
  contenedorCarritoVacio.innerText =
    "¡Excelente! Tu orden de compra ha sido generada (consulta tus descargas).\nComparte el comprobante con el vendedor para coordinar medios de pago y entrega lo antes posible.";

  // Vaciar el carrito y guardar en el almacenamiento local después de generar el recibo
  productosEnCarrito.length = 0;
  localStorage.setItem(
    "productos-en-carrito",
    JSON.stringify(productosEnCarrito)
  );

  const blob = new Blob([reciboHTML], { type: "text/html" }); // Crear un Blob con el contenido HTML del recibo

  // Crear un objeto URL para el Blob
  const url = window.URL.createObjectURL(blob);

  // Crear un enlace <a> para descargar el recibo
  const link = document.createElement("a");
  link.href = url;
  link.download = `recibo_${numeroCompraConLetra}.html`; // Nombre de archivo para la descarga
  link.style.display = "none"; // Ocultar el enlace

  // Agregar el enlace al DOM y hacer clic en él para iniciar la descarga
  document.body.appendChild(link);
  link.click();

  // Limpiar el objeto URL y eliminar el enlace del DOM después de la descarga
  window.URL.revokeObjectURL(url);
  document.body.removeChild(link);

  // Después de vaciar el carrito, actualizar la visualización del carrito
  cargarProductosCarrito();
}

function generarNumeroCompra() {
  return Math.floor(Math.random() * 1000000); // Genera un número aleatorio de 6 dígitos
}
