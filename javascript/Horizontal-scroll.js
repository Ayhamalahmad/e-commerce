import { PopularIGallery, PopularICarouselItem } from "./elementsHandler.js";
const previous = document.querySelector(".btns .previous");
const nextBtn = document.querySelector(".btns .next");
previous.addEventListener("click", (e) => {
  if ((PopularIGallery, PopularICarouselItem)) {
    PopularIGallery.scrollLeft -= PopularICarouselItem.offsetWidth + 10;
    console.log("scroll right");
  }
});
nextBtn.addEventListener("click", (e) => {
  if ((PopularIGallery, PopularICarouselItem)) {
    PopularIGallery.scrollLeft += PopularICarouselItem.offsetWidth + 10;
    console.log("scroll Left");
  }
});
