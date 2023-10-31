// preview =>// https://preview.colorlib.com/theme/product/index.html
const navbar = document.querySelector(".navbar");
const scrollThreshold = 100;

window.addEventListener("scroll", (e) => {
  const scrollTop = window.scrollY;

  if (scrollTop >= scrollThreshold) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});
