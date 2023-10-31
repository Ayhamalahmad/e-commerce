// console.clear();
// Import the storage module from the elementsHandler.js file
import { storage,uniqueItem } from "./elementsHandler.js";
// Retrieve selected items from local storage
// export let selectedItems = storage.getStorage("product");

// Define a template for a cart item 
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
    <td class="total-item">${e.product_price}</td>
    <td><button id="${e.id}"  class="delete-item btn btn-danger"><i class="fas fa-trash-alt"></i></button></td>
  </tr>`;
};
// Get a reference to the table body element
const tbody = document.querySelector("tbody");
// Remove duplicates from the selected items
// export const uniqueItems = selectedItems.reduce((acc, currentItem) => {
//   const isDuplicate = acc.some((item) => item.id === currentItem.id);
//   if (!isDuplicate) {
//     acc.push(currentItem);
//   }
//   return acc;
// }, []);
// Insert cart items into the table
uniqueItem.forEach((element) => {
  console.log(element);
  tbody?.insertAdjacentHTML("beforeend", cartItem(element));
});
// Delete items from the cart
let deleteItem = document.querySelectorAll(".delete-item");
deleteItem.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    btn.parentElement.parentElement.remove();
    console.log(btn.id);
    storage.removeFromArray(btn.id);
  });
});
// Handle quantity change (increase and decrease)
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
  sumTotals();
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
// Get references to total item and product price elements
const totalItems = document.querySelectorAll(".total-item");
const product_prices = document.querySelectorAll(".product_price");
// Update total prices
function handleTotal() {
  product_prices.forEach((price,index) => {
    let originalText = `${price.textContent}`;
    let textWithoutCurrency = originalText.replace(/£/g, "");
    let input = document.querySelectorAll(".selected-items")[index];
    const total = input.value * Number(textWithoutCurrency);
    totalItems[index].textContent=`£${total}`;
  });
}
// Get references to selected item inputs
let inputs = document.querySelectorAll(".selected-items");
inputs.forEach((input)=>{
  input.addEventListener("change",()=>{
    handleTotal();
    sumTotals();
  })
})
// Calculate and display the subtotal and total
function sumTotals(){
  const subtotal=document.querySelector(".subtotal");
  const total=document.querySelector(".total");
  let totalSum =0;
  totalItems.forEach((total,index)=>{
    let originalText = `${total.textContent}`;
    let textWithoutCurrency = originalText.replace(/£/g, "");
    totalSum += Number(textWithoutCurrency);
  })
  // console.log("totalSum",totalSum);
  if(subtotal,total){
    subtotal.textContent=`£${totalSum}`
    total.textContent=`£${totalSum}`
  }

}
// Initialize the total calculation
sumTotals();
// // Display the number of unique items in the cart
  const itemInCart =document.querySelector(".item-in-cart");
    itemInCart.textContent=uniqueItem.length;
// cartItems();