const fechaActualizacion = document.getElementById("fechaActualizacion");
const compra = document.getElementById("compra");
const venta = document.getElementById("venta");

async function DolarBlue() {
  const url = "https://dolarapi.com/v1/dolares/blue";
  try {
    const dolarApi = await fetch(url);
    const data = await dolarApi.json();

    let fechaActualizadaFinal = data.fechaActualizacion.slice(0, 10);
    fechaActualizacion.innerHTML = "Fecha: " + fechaActualizadaFinal;

    compra.innerHTML = "Compra: ARG $" + data.compra;
    venta.innerHTML = "Venta: ARG $" + data.venta;
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Promesa finalizada (cotización USD)");
  }
}

try {
  DolarBlue();
} catch (error) {
  console.log(error);
}
