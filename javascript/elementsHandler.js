import { servicesData, productsData } from "./data.js";
const features = document.querySelector(".features");
const products = document.querySelector(".products");
const wrappar = document.querySelector(".wrappar");
const tbody = document.querySelector("tbody");
let uniqueItem = [];
const cartItem = (e) => {
  return `
    <tr>
    <th scope="row">
      <img class="img-fluid" src="${e.image}" alt="" />
    </th>
    <td>${e.product_title}</td>
    <td>${e.product_price}</td>
    <td>
      <div
        class="increase-selected-items-decrease d-flex align-items-center"
      >
        <div class="">
          <button class="increase btn btn-secondary">-</button>
        </div>
        <div class="seleted-num">
          <input
            class="selected-items form-control"
            type="text"
            value="1"
          />
        </div>
        <div class="">
          <button class="decrease btn btn-secondary">+</button>
        </div>
      </div>
    </td>
    <td>$49.00</td>
    <td><button id="${e.id}"  class="delete-item btn btn-danger"><i class="fas fa-trash-alt"></i></button></td>
  </tr>`;
};
// storage
export class storage {
  static addToDStorage(product) {
    let storage = localStorage.setItem("product", JSON.stringify(product));
    return storage;
  }
  static getStorage() {
    let storage =
      localStorage.getItem("product") === null
        ? []
        : JSON.parse(localStorage.getItem("product"));
    return storage;
  }
  static removeFromArray(id) {
    let selectedItems = storage.getStorage("product");
    const indexToDelete = selectedItems.findIndex((item) => item.id === id);
    if (indexToDelete !== -1) {
      selectedItems.splice(indexToDelete, 1);
      let selectedItemsNew = selectedItems.filter((item) => item.id !== id);
      storage.addToDStorage(selectedItemsNew);
    }
  }
}

// services
const servicesDataEl = (e) => {
  return `
  <div class="col-sm-6 col-md-4 mb-3 mb-md-0">
  <div id="${e.id}"
    class="feature text-center h-100 d-flex align-items-center flex-column gap-2"
  >
    <i class="${e.feature.icon}"></i>
    <h3 class="mt-1">${e.feature.title}</h3>
    <p class="text-center">
      ${e.feature.description}
    </p>
  </div>
</div>
  `;
};
if (servicesData.features) {
  servicesData.features.map((e) => {
    features?.insertAdjacentHTML("beforeend", servicesDataEl(e));
  });
}
// products
const productsDataEl = (e) => {
  return `

  <div class="product col-6 col-sm-6 col-md-6 mb-4 col-lg-4 px-2">
          <div class="image position-relative">
            <span class="badge position-absolute rounded-0">NEW</span>
            <img
              class="product-image w-100"
              src="${e.image}"
              alt="Product Image"
            />
          </div>
          <div class="product-info mt-4 text text-center">
            <h6 class="my-1 product-title">${e.product_title}</h6>
            <p class="product-price mt-1">${e.product_price}</p>
            <button id="${e.id}"
              class="productsBtn btn btn py-3 btn-light border-1 border-black rounded-0 w-100 text-capitalize add-to-cart-btn"
            >
              <i class="me-2 fas fa-cart-plus"></i>add to cart
            </button>
          </div>
        </div>
  `;
};
// Popular Items
const PopularItems = (e) => {
  return `

  <div class="item col-12 col-md-6 col-lg-4 px-2">
          <div class="image position-relative">
            <span class="badge position-absolute rounded-0">NEW</span>
            <img
              class="product-image w-100"
              src="${e.image}"
              alt="Product Image"
            />
          </div>
          <div class="product-info mt-4 text text-center">
            <h6 class="my-1 product-title">${e.product_title}</h6>
            <p class="product-price mt-1">${e.product_price}</p>
            <button id="${e.id}"
              class="productsBtn btn btn py-3 btn-light border-1 border-black rounded-0 text-capitalize add-to-cart-btn"
            >
              <i class="me-2 fas fa-cart-plus"></i>add to cart
            </button>
          </div>
        </div>
  `;
};
//

if (productsData.products) {
  productsData.products.map((e) => {
    products?.insertAdjacentHTML("beforeend", productsDataEl(e));
    wrappar?.insertAdjacentHTML("beforeend", PopularItems(e));
  });
}
const PopularIGallery = document.querySelector("#Popular-Items .gallery");
const PopularICarouselItem = document.querySelector("#Popular-Items .item");
// do not move this to any place
const productsBtn = document.querySelectorAll(".productsBtn");
// Store the cart items in the array
const cartItemsArray = [];
productsBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.target.classList.add("clicked");
    const productId = e.target.id;
    const product = productsData.products.find((e) => e.id === productId);
    if (product) {
      massegeHandler();
      // Add the product to the cart items array
      cartItemsArray.push(product);
      storage.addToDStorage(cartItemsArray);

      cartItemsArray.forEach((element) => {
        tbody?.insertAdjacentHTML("beforeend", cartItem(element));
      });
    }
  });
});
//
// Remove duplicates from the selected items
function duplicates() {
  let selectedItems = storage.getStorage("product");
  const uniqueItems = selectedItems.reduce((acc, currentItem) => {
    const isDuplicate = acc.some((item) => item.id === currentItem.id);
    if (!isDuplicate) {
      acc.push(currentItem);
      uniqueItem.push(currentItem);
    }
    return acc;
  }, []);
  cartItems();
}
duplicates();
function cartItems() {
  // Display the number of unique items in the cart
  const itemInCart = document.querySelector(".item-in-cart");
  itemInCart.textContent = uniqueItem.length;
}
// cartItems();
// show massege when the item added to the cart
function massegeHandler() {
  const message = document.getElementById("message");
  // console.log(message);
  message.classList.remove("hidden");
  setTimeout(() => {
    message.classList.add("hidden");
  }, 2000);
}
export { uniqueItem, PopularIGallery, PopularICarouselItem };
