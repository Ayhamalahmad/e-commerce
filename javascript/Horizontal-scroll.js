const previous = document.querySelector(".btns .previous");
const nextBtn = document.querySelector(".btns .next");
console.log(previous, nextBtn);
const PopularIGallery = document.querySelector("#Popular-Items .gallery");
const PopularICarouselItem = document.querySelector("#Popular-Items .item");
console.log(PopularICarouselItem);
console.log(PopularICarouselItem.offsetWidth);
previous.addEventListener("click", (e) => {
  PopularIGallery.scrollLeft -= PopularICarouselItem.offsetWidth + 10;
  console.log("scroll right");
});
nextBtn.addEventListener("click", (e) => {
  PopularIGallery.scrollLeft += PopularICarouselItem.offsetWidth + 10;
  console.log("scroll Left");
});
// console.clear();
