const sliderHero = document.getElementById("slider-hero");
const slidesHero = document.querySelectorAll(".slide-hero");
let indexHero = 0;
let intervalId;

// Agregar la transición dinámicamente
sliderHero.style.transition = "transform 1.5s ease-in-out"; // Transición de desplazamiento

function showSlideHero() {
  sliderHero.style.transform = `translateX(${
    (-indexHero * 100) / slidesHero.length
  }%)`;
}

function nextSlideHero() {
  indexHero++;
  if (indexHero >= slidesHero.length) {
    indexHero = 0;
  }
  restartInterval();
  showSlideHero();
}

function prevSlideHero() {
  indexHero--;
  if (indexHero < 0) {
    indexHero = slidesHero.length - 1;
  }
  restartInterval();
  showSlideHero();
}

function restartInterval() {
  clearInterval(intervalId);
  intervalId = setInterval(nextSlideHero, 5000);
}

intervalId = setInterval(nextSlideHero, 5000); // Iniciar el intervalo

showSlideHero(); // Muestra el primer slide al cargar la página
