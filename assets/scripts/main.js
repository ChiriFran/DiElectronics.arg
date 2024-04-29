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
      tituloPrincipal.innerText = "Productos destacados";
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

inputBusqueda.addEventListener("input", () => {
  const textoBusqueda = inputBusqueda.value.trim().toLowerCase();
  const productosFiltrados = productos.filter((producto) => {
    const titulo = producto.titulo.toLowerCase();
    const categoria = producto.categoria.nombre.toLowerCase();
    return titulo.includes(textoBusqueda) || categoria.includes(textoBusqueda);
  });
  cargarProductos(productosFiltrados);
});
