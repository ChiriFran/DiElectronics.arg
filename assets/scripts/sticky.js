function handleScroll() {
  const isSticky = window.scrollY > 200;
  applyStickyStyles(isSticky);
}

function applyStickyStyles(isSticky) {
  const nav = document.querySelector(".nav");
  const headerTitle = document.querySelector(".headerTitle");

  const iconNavBarMobileLogo = document.getElementById("navBarMobileLogo");
  const iconNavBarMobile = document.getElementById("navBarMobile");

  nav.classList.toggle("sticky", isSticky);
  iconNavBarMobile.classList.toggle("mobileSticky", window.scrollY > 200);

  const visibility = isSticky ? "visible" : "hidden";
  const position = isSticky ? "relative" : "absolute";

  iconNavBarMobileLogo.style.visibility = visibility;
  iconNavBarMobileLogo.style.position = position;


  headerTitle.classList.toggle("headerSticky", isSticky);

  const underlineHovers = document.querySelectorAll(".underlined-hover");
  underlineHovers.forEach((underlineHover) => {
    underlineHover.style.setProperty("--colorFont", isSticky ? "#fff" : "#000");
  });
}

window.addEventListener("scroll", handleScroll);
