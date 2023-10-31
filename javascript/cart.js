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
            type="number"
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
// const inputs =document.querySelectorAll(".selected-items");
const decreaseBtns =document.querySelectorAll(".decrease");
const increaseBtns =document.querySelectorAll(".increase");
// console.log(inputs);
console.log(decreaseBtns);
console.log(increaseBtns);
decreaseBtns.forEach((btn)=>{
    btn.addEventListener("click",(e)=>{
        let input = btn.parentElement.previousElementElement;
        console.log(input);
        input.value = parseInt(input.value) + 1;
    })
})