const moneda = document.getElementById("moneda");
let fechaActualizacion = document.getElementById("fechaActualizacion");
let compra = document.getElementById("compra");
let venta = document.getElementById("venta");

async function DolarBlue() {
  const url = "https://dolarapi.com/v1/dolares/blue";
  const dolarApi = await fetch(url);
  const data = await dolarApi.json();

  let fechaActualizadaFinal = data.fechaActualizacion.slice(0, 10);
  fechaActualizacion.innerHTML = "Fecha: " + fechaActualizadaFinal;

  moneda.innerHTML = "Cotizacion " + data.moneda;
  compra.innerHTML = "Compra: ARG $" + data.compra;
  venta.innerHTML = "Venta: ARG $" + data.venta;
}

try {
  DolarBlue();
} catch {
  console.log(err);
} finally {
  console.log("Promesa finalizada (cotizacion USD)");
}

// Obtener la lista de textos y establecer el índice actual
const textosDolar = document.querySelector(".textosDolar");
let currentIndex = 0;

// Función para mostrar el siguiente texto con una transición
function mostrarSiguienteTexto() {
  const textos = textosDolar.querySelectorAll("li");
  // Ocultar todos los textos
  textos.forEach((texto, index) => {
    if (index !== currentIndex) {
      texto.style.opacity = "0"; // Ocultar texto
    }
  });
  // Mostrar el siguiente texto con una transición
  textos[currentIndex].style.opacity = "1"; // Mostrar texto
  // Incrementar el índice para el próximo texto
  currentIndex = (currentIndex + 1) % textos.length;
}

// Mostrar el primer texto al cargar la página
mostrarSiguienteTexto();

// Cambiar de texto cada 3 segundos
setInterval(mostrarSiguienteTexto, 3000);

const infoDolar = document.querySelector(".infoDolar");
const mostrarInfoBtn = document.getElementById("mostrarInfoBtn");
const cerrarInfoBtn = document.getElementById("cerrarInfoBtn");

// Función para mostrar la información del dólar
function mostrarInformacion() {
  infoDolar.style.display = "flex"; // Mostrar la información
  mostrarInfoBtn.style.display = "none"; // Ocultar el botón de abrir
}

// Función para ocultar la información del dólar
function ocultarInformacion() {
  infoDolar.style.display = "none"; // Ocultar la información
  mostrarInfoBtn.style.display = "block"; // Mostrar el botón de abrir
}

// Agregar evento de clic al botón para mostrar la información
mostrarInfoBtn.addEventListener("click", mostrarInformacion);

// Agregar evento de clic al botón de cierre para ocultar la información
cerrarInfoBtn.addEventListener("click", ocultarInformacion);

// Agregar evento de clic fuera de la información para ocultarla
document.addEventListener("click", function (event) {
  if (!infoDolar.contains(event.target) && event.target !== mostrarInfoBtn) {
    ocultarInformacion();
  }
});

// Ocultar la información inicialmente
window.onload = function () {
  ocultarInformacion();
};
