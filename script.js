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
                  <textarea disabled>${itemsArray[index]}</textarea>
                  <div class="edit-controller">
                    <i class="fa-solid fa-check deleteBtn"></i>
                    <i class="fa-solid fa-pen-to-square editBtn"></i>
                  </div>
                </div>
                <div class="update-controller">
                  <button class="saveBtn">Save</button>
                  <button class="cancelBtn">Cancel</button>
                </div>
              </div>`;
  }

  document.querySelector(".to-do-list").innerHTML = items;
  activateDeleteListeners();
  activateEditListeners();
  activateSaveListeners();
  activateCancelListeners();
}

function activateDeleteListeners() {
  let deleteBtn = document.querySelectorAll(".deleteBtn");
  deleteBtn.forEach((dB, index) => {
    dB.addEventListener("click", () => {
      deleteItem(index);
    });
  });
}

function activateEditListeners() {
  const editBtn = document.querySelectorAll(".editBtn");
  const updateController = document.querySelectorAll(".update-controller");
  const inputs = document.querySelectorAll(".input-controller textarea");
  editBtn.forEach((eB, index) => {
    eB.addEventListener("click", () => {
      updateController[index].style.display = "block";
      inputs[index].disabled = false;
    });
  });
}

function activateSaveListeners() {
  const saveBtn = document.querySelectorAll(".saveBtn");
  const inputs = document.querySelectorAll(".input-controller textarea");
  saveBtn.forEach((sB, index) => {
    sB.addEventListener("click", () => {
      updateItem(inputs[index].value, index);
    });
  });
}

function activateCancelListeners() {
  const cancelBtn = document.querySelectorAll(".cancelBtn");
  const updateController = document.querySelectorAll(".update-controller");
  const inputs = document.querySelectorAll(".input-controller textarea");
  cancelBtn.forEach((cB, index) => {
    cB.addEventListener("click", () => {
      updateController[index].style.display = "none";
      inputs[index].disabled = true;
      inputs[index].style.border = "none";
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

function updateItem(text, index) {
  itemsArray[index] = text;
  localStorage.setItem("items", JSON.stringify(itemsArray));
  location.reload();
}

window.onload = function () {
  displayItems();
};
