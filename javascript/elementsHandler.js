console.clear();
import { servicesData, productsData } from "./data.js";
import { selectedItems } from "./cart.js";
const features = document.querySelector(".features");
const products = document.querySelector(".products");
const tbody = document.querySelector("tbody");
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
    let selectedItemsNew = selectedItems.filter((item) => item.id !== id);
    storage.addToDStorage(selectedItemsNew);
    console.log("selectedItemsNew", selectedItemsNew);
    localStorage.removeItem(selectedItemsNew);
    console.log(selectedItemsNew);
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
} else {
  console.log("The servicesData.features property does not exist.");
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

if (productsData.products) {
  productsData.products.map((e) => {
    console.log(e.image);

    products?.insertAdjacentHTML("beforeend", productsDataEl(e));
  });
} else {
  console.log("The servicesData.features property does not exist.");
}
// do not move this to any place
const productsBtn = document.querySelectorAll(".productsBtn");
// Store the cart items in an array
const cartItemsArray = [];
productsBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const productId = e.target.id;
    const product = productsData.products.find((e) => e.id === productId);
    if (product) {
      // Add the product to the cart items array
      cartItemsArray.push(product);
      storage.addToDStorage(cartItemsArray);
      cartItemsArray.forEach((element) => {
        tbody?.insertAdjacentHTML("beforeend", cartItem(element));
      });
    }
  });
});
