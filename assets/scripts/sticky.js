function handleScroll() {
  const isSticky = window.scrollY > 250;
  applyStickyStyles(isSticky);
  handleStickyActions(isSticky);
}

function applyStickyStyles(isSticky) {
  const nav = document.querySelector(".nav");
  const logo = document.querySelector(".navLogo");

  const stickyLinks = document.querySelectorAll(".stickyLinks");
  const iconNavBarMobileLogo = document.getElementById("navBarMobileLogo");
  const iconNavBarMobile = document.getElementById("navBarMobile");

  nav.classList.toggle("sticky", isSticky);
  iconNavBarMobile.classList.toggle("mobileSticky", window.scrollY > 200);

  const visibility = isSticky ? "visible" : "hidden";
  const position = isSticky ? "relative" : "absolute";

  iconNavBarMobileLogo.style.visibility = visibility;
  iconNavBarMobileLogo.style.position = position;

  stickyLinks.forEach((link) => {
    link.style.position = position;
    link.style.visibility = visibility;
  });

  // Cambiar color del subrayado del texto dentro del elemento .underline-hover::before
  const underlineHovers = document.querySelectorAll(".underlined-hover");
  underlineHovers.forEach((underlineHover) => {
    underlineHover.style.setProperty(
      "--colorFont",
      isSticky ? "#fff" : "#000"
    );
  });
}

window.addEventListener("scroll", handleScroll);
