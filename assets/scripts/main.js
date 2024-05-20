let productos = [];

fetch("assets/scripts/productos.json")
  .then((response) => response.json())
  .then((data) => {
    productos = data;
    cargarProductos(productos);
  });

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");
const inputBusqueda = document.querySelector("#input-busqueda");

botonesCategorias.forEach((boton) =>
  boton.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
  })
);

function cargarProductos(productosElegidos) {
  contenedorProductos.innerHTML = "";

  if (productosElegidos.length === 0) {
    // Mostrar mensaje de que no hay productos disponibles
    contenedorProductos.innerHTML =
      "<p>No hay productos disponibles con nombre o categoria '" +
      document.getElementById("input-busqueda").value +
      "'.</p>";
  } else {
    productosElegidos.forEach((producto) => {
      const div = document.createElement("div");
      div.classList.add("producto");
      div.innerHTML = `
                <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="producto-detalles">
                    <h3 class="producto-titulo">${producto.titulo}</h3>
                    <p class="producto-precio">$${producto.precio} USD</p>
                    <button class="btn-ver-mas" data-id="${producto.id}">Ver más</button>
                    <button class="btn-96 producto-agregar" id="${producto.id}"><span>Agregar</span></button>
                </div>
            `;

      contenedorProductos.append(div);
    });
  }

  // Actualizar botones de agregar
  actualizarBotonesAgregar();
}

// Agregar evento de clic a todos los botones de categoría y el nuevo botón topSale
[...botonesCategorias, document.querySelector("#topSale")].forEach((boton) => {
  boton.addEventListener("click", (e) => {
    // Quitar clase 'active' de todos los botones
    [...botonesCategorias, document.querySelector("#topSale")].forEach(
      (boton) => boton.classList.remove("active")
    );
    // Agregar clase 'active' al botón clickeado
    e.currentTarget.classList.add("active");

    if (e.currentTarget.id === "topSale") {
      // Filtrar productos por estado topSale
      const productosTopSale = productos.filter(
        (producto) => producto.estado === "topSale"
      );
      // Cargar productos filtrados
      cargarProductos(productosTopSale);
      // Actualizar título principal
      tituloPrincipal.innerText = "Lo mas vendido";
    } else if (e.currentTarget.id !== "todos") {
      // Filtrar productos por categoría
      const productosCategoria = productos.filter(
        (producto) => producto.categoria.id === e.currentTarget.id
      );
      // Obtener nombre de la categoría
      const nombreCategoria =
        productosCategoria.length > 0
          ? productosCategoria[0].categoria.nombre
          : "";
      // Cargar productos filtrados
      cargarProductos(productosCategoria);
      // Actualizar título principal
      tituloPrincipal.innerText = nombreCategoria;
    } else {
      // Mostrar todos los productos
      cargarProductos(productos);
      // Actualizar título principal
      tituloPrincipal.innerText = "Todos los productos";
    }
  });
});

function actualizarBotonesAgregar() {
  botonesAgregar = document.querySelectorAll(".producto-agregar");

  botonesAgregar.forEach((boton) => {
    boton.addEventListener("click", agregarAlCarrito);
  });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
  productosEnCarrito = JSON.parse(productosEnCarritoLS);
  actualizarNumerito();
} else {
  productosEnCarrito = [];
}

function agregarAlCarrito(e) {
  Toastify({
    text: "Producto agregado",
    duration: 3000,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #0e0700, #502902)",
      borderRadius: "2rem",
      textTransform: "uppercase",
      fontSize: ".75rem",
      color: "#fff",
    },
    offset: {
      x: "1.5rem", // horizontal axis - can be a number or a string indicating unity. eg: '2em'
      y: "1.5rem", // vertical axis - can be a number or a string indicating unity. eg: '2em'
    },
    onClick: function () {}, // Callback after click
  }).showToast();

  const idBoton = e.currentTarget.id;
  const productoAgregado = productos.find(
    (producto) => producto.id === idBoton
  );

  if (productosEnCarrito.some((producto) => producto.id === idBoton)) {
    const index = productosEnCarrito.findIndex(
      (producto) => producto.id === idBoton
    );
    productosEnCarrito[index].cantidad++;
  } else {
    productoAgregado.cantidad = 1;
    productosEnCarrito.push(productoAgregado);
  }

  actualizarNumerito();

  localStorage.setItem(
    "productos-en-carrito",
    JSON.stringify(productosEnCarrito)
  );
}

function actualizarNumerito() {
  let nuevoNumerito = productosEnCarrito.reduce(
    (acc, producto) => acc + producto.cantidad,
    0
  );
  numerito.innerText = nuevoNumerito;
}

/* BUSQUEDA Y FILTRO PARA LA TIENDA */

inputBusqueda.addEventListener("input", () => {
  const textoBusqueda = inputBusqueda.value.trim().toLowerCase();
  const productosFiltrados = productos.filter((producto) => {
    const titulo = producto.titulo.toLowerCase();
    const categoria = producto.categoria.nombre.toLowerCase();
    return titulo.includes(textoBusqueda) || categoria.includes(textoBusqueda);
  });
  cargarProductos(productosFiltrados);
});

// Función para ordenar y renderizar los productos de mayor a menor precio
function ordenarYRenderizarPorPrecioMayor() {
  const productosEnPantalla = Array.from(
    contenedorProductos.querySelectorAll(".producto")
  );
  const productosOrdenados = productosEnPantalla.sort((a, b) => {
    const precioA = parseFloat(
      a.querySelector(".producto-precio").innerText.replace("$", "")
    );
    const precioB = parseFloat(
      b.querySelector(".producto-precio").innerText.replace("$", "")
    );
    return precioB - precioA;
  });
  productosOrdenados.forEach((producto) =>
    contenedorProductos.appendChild(producto)
  );
}

// Función para ordenar y renderizar los productos de menor a mayor precio
function ordenarYRenderizarPorPrecioMenor() {
  const productosEnPantalla = Array.from(
    contenedorProductos.querySelectorAll(".producto")
  );
  const productosOrdenados = productosEnPantalla.sort((a, b) => {
    const precioA = parseFloat(
      a.querySelector(".producto-precio").innerText.replace("$", "")
    );
    const precioB = parseFloat(
      b.querySelector(".producto-precio").innerText.replace("$", "")
    );
    return precioA - precioB;
  });
  productosOrdenados.forEach((producto) =>
    contenedorProductos.appendChild(producto)
  );
}

// Buscar los botones en el DOM
const botonOrdenarMayor = document.querySelector("#ordenar-descendente");
const botonOrdenarMenor = document.querySelector("#ordenar-ascendente");

// Agregar eventos a los botones de ordenar
botonOrdenarMayor.addEventListener("click", ordenarYRenderizarPorPrecioMayor);
botonOrdenarMenor.addEventListener("click", ordenarYRenderizarPorPrecioMenor);

// Función para ordenar y renderizar los productos de la A a la Z
function ordenarYRenderizarPorNombreAZ() {
  const productosEnPantalla = Array.from(
    contenedorProductos.querySelectorAll(".producto")
  );
  const productosOrdenados = productosEnPantalla.sort((a, b) => {
    const nombreA = a.querySelector(".producto-titulo").innerText.toLowerCase();
    const nombreB = b.querySelector(".producto-titulo").innerText.toLowerCase();
    return nombreA.localeCompare(nombreB);
  });
  productosOrdenados.forEach((producto) =>
    contenedorProductos.appendChild(producto)
  );
}

// Función para ordenar y renderizar los productos de la Z a la A
function ordenarYRenderizarPorNombreZA() {
  const productosEnPantalla = Array.from(
    contenedorProductos.querySelectorAll(".producto")
  );
  const productosOrdenados = productosEnPantalla.sort((a, b) => {
    const nombreA = a.querySelector(".producto-titulo").innerText.toLowerCase();
    const nombreB = b.querySelector(".producto-titulo").innerText.toLowerCase();
    return nombreB.localeCompare(nombreA);
  });
  productosOrdenados.forEach((producto) =>
    contenedorProductos.appendChild(producto)
  );
}

// Buscar los botones en el DOM
const botonOrdenarNombreAZ = document.querySelector("#ordenar-nombre-az");
const botonOrdenarNombreZA = document.querySelector("#ordenar-nombre-za");

// Agregar eventos a los botones de ordenar por nombre
botonOrdenarNombreAZ.addEventListener("click", ordenarYRenderizarPorNombreAZ);
botonOrdenarNombreZA.addEventListener("click", ordenarYRenderizarPorNombreZA);

/* fetch especificaciones */
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("btn-ver-mas")) {
    const productoTitulo =
      event.target.parentElement.querySelector(".producto-titulo").innerText;
    fetch("assets/scripts/especificaciones.json")
      .then((response) => response.json())
      .then((data) => {
        // Buscar las especificaciones según el título del producto
        const especificaciones = data.find(
          (item) => item.id.toLowerCase() === productoTitulo.toLowerCase()
        );
        if (especificaciones) {
          mostrarEspecificaciones(especificaciones, productoTitulo);
        } else {
          console.error(
            "No se encontraron especificaciones para el producto:",
            productoTitulo
          );
        }
      });
  }
});

function mostrarEspecificaciones(especificaciones, tituloProducto) {
  // Crear el modal
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close">&times;</span>
      <h4 class="especificacionesTitulo">Especificaciones</h4>
      <h3 class="especificacionesProducto">${tituloProducto}</h3>
      <ul>
        <li class="especificacionesAcabado">Acabado: ${especificaciones.acabado}</li>
        <li class="especificacionesAcabado">Capacidad: ${especificaciones.capacidad}</li>
        <li class="especificacionesDimensiones">Dimensiones: ${especificaciones.dimensiones}</li>
        <li class="especificacionesPantalla">Pantalla: ${especificaciones.pantalla}</li>
        <li class="especificacionesChip">Chip: ${especificaciones.chip}</li>
        <li class="especificacionesCamara">Cámara: ${especificaciones.camara}</li>
      </ul>
    </div>
  `;
  document.body.appendChild(modal);

  // Obtener el botón para cerrar el modal
  const closeButton = modal.querySelector(".close");

  // Cerrar el modal cuando se hace clic en el botón de cerrar
  closeButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Cerrar el modal al hacer clic fuera de él
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  // Mostrar el modal
  modal.style.display = "block";
}
