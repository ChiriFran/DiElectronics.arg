// Función para verificar si un elemento está en la vista
function isInViewport(element) {
  var bounding = element.getBoundingClientRect();
  return (
    bounding.top >= 0 &&
    bounding.left >= 0 &&
    bounding.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    bounding.right <=
      (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Función para aplicar el efecto de rotación cuando el contenedor está en la vista
function applyRotationEffect() {
  var container = document.querySelector(".container");
  if (isInViewport(container)) {
    container.classList.add("rotated");
  } else {
    container.classList.remove("rotated");
  }
}

// Escuchar el evento de scroll y aplicar el efecto de rotación cuando sea necesario
window.addEventListener("scroll", applyRotationEffect);

// Aplicar el efecto de rotación cuando la página carga por primera vez si el contenedor está en la vista
applyRotationEffect();

/* navegacion scroll cards */
document.addEventListener("DOMContentLoaded", function () {
  const dots = document.querySelectorAll(".dot");
  const container = document.querySelector(".inner-container");

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      scrollTo(index);
      setActiveDot(index);
    });
  });

  function scrollTo(index) {
    const scrollAmount = container.offsetWidth * index;
    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  }

  function setActiveDot(index) {
    dots.forEach((dot) => dot.classList.remove("active"));
    dots[index].classList.add("active");
  }
});
