import { storage } from "./elementsHandler.js";
// selected Items
export let selectedItems = storage.getStorage("product");

//
const cartItem = (e) => {
  return `
    <tr>
    <th scope="row">
      <img class="img-fluid" src="${e.image}" alt="" />
    </th>
    <td>${e.product_title}</td>
    <td class="product_price">${e.product_price}</td>
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
            type="number"
            value="1"
          />
        </div>
        <div class="">
          <button class="decrease btn btn-secondary">+</button>
        </div>
      </div>
    </td>
    <td >$<span class="total-item">49.00</span></td>
    <td><button id="${e.id}"  class="delete-item btn btn-danger"><i class="fas fa-trash-alt"></i></button></td>
  </tr>`;
};
const tbody = document.querySelector("tbody");
console.log(tbody);
const uniqueItems = selectedItems.reduce((acc, currentItem) => {
  const isDuplicate = acc.some((item) => item.id === currentItem.id);
  if (!isDuplicate) {
    acc.push(currentItem);
  }
  return acc;
}, []);
uniqueItems.forEach((element) => {
  console.log(element);
  tbody?.insertAdjacentHTML("beforeend", cartItem(element));
});
// delete Item
let deleteItem = document.querySelectorAll(".delete-item");
deleteItem.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    btn.parentElement.parentElement.remove();
    console.log(btn.id);
    storage.removeFromArray(btn.id);
  });
});
// decrease  and increase
const decreaseBtns = document.querySelectorAll(".decrease");
const increaseBtns = document.querySelectorAll(".increase");
function handleQuantityChange(action, input) {
  let value = parseInt(input.value);
  if (action === "increase" && value > 1) {
    input.value = value - 1;
  } else if (action === "decrease") {
    input.value = value + 1;
  }
  handleTotal();
}

decreaseBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let input = btn.parentElement.parentElement.querySelector(".seleted-num .selected-items");
    handleQuantityChange("decrease", input);
  });
});

increaseBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let input = btn.parentElement.parentElement.querySelector(".seleted-num .selected-items");
    handleQuantityChange("increase", input);
  });
});

const totalItems = document.querySelectorAll(".total-item");
const product_prices = document.querySelectorAll(".product_price");
function handleTotal() {
  product_prices.forEach((price,index) => {
    let originalText = `${price.textContent}`;
    let textWithoutCurrency = originalText.replace(/£/g, "");
    let input = document.querySelectorAll(".selected-items")[index];
    const total = input.value * Number(textWithoutCurrency);
    totalItems[index].textContent=total;
  });
}

let inputs = document.querySelectorAll(".selected-items");
inputs.forEach((input)=>{
  input.addEventListener("change",()=>{
    handleTotal();
  })
})