const itemsArray = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];

document.querySelector("#enter").addEventListener("click", () => {
  const item = document.querySelector("#item");
  createItem(item);
});

function displayItems() {
  let items = "";
  for (let index = 0; index < itemsArray.length; index++) {
    items += `<div class="item">
                <div class="input-controller">
                <input type="checkbox" name="" id="task-1" />
                    <label for="task-1" id="task-1">
                        <span class="custom-checkbox"></span>
                        ${itemsArray[index]}
                        </label>
                  <div class="fa-solid fa-delete-left deleteBtn">
                  </div>
                </div>
              </div>`;
  }

  document.querySelector(".to-do-list").innerHTML = items;
  activateDeleteListeners();
}

function activateDeleteListeners() {
  let deleteBtn = document.querySelectorAll(".deleteBtn");
  deleteBtn.forEach((dB, index) => {
    dB.addEventListener("click", () => {
      deleteItem(index);
    });
  });
}

function createItem(item) {
  itemsArray.push(item.value);
  localStorage.setItem("items", JSON.stringify(itemsArray));
  location.reload();
}

function deleteItem(index) {
  itemsArray.splice(index, 1);
  localStorage.setItem("items", JSON.stringify(itemsArray));
  location.reload();
}
window.onload = function () {
  displayItems();
};