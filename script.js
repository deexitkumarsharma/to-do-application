const taskInput = document.querySelector(".task-input input"),
  filters = document.querySelectorAll(".filters span"),
  clearAll = document.querySelector(".clear-btn"),
  taskBox = document.querySelector(".task-box");

let editId,
  isEditTask = false,
  todos = JSON.parse(localStorage.getItem("todo-list"));

filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector("span.active").classList.remove("active");
    btn.classList.add("active");
    showTodo(btn.id);
  });
});

showTodo("all");

function showTodo(filter) {
  let liTag = "";
  if (todos) {
    todos.forEach((todo, id) => {
      console.log(id);
      let completed = todo.status == "completed" ? "checked" : "";
      if (filter == todo.status || filter == "all") {
        liTag += `<li class="task">
                            <label id="jalena" for=${id}>
                                <input onclick="updateStatus(this)" type="checkbox" id=${id} id="jalena" ${completed}>
                                <p class=${completed}>${todo.name}</p>
                              </label>
                            <button class="delete">delete </button>
                        </li>`;
      }
    });
  }

  taskBox.innerHTML = liTag || `<span>You don't have any task here</span>`;
  let checkTask = taskBox.querySelectorAll(".task");
  !checkTask.length
    ? clearAll.classList.remove("active")
    : clearAll.classList.add("active");
  taskBox.offsetHeight >= 300
    ? taskBox.classList.add("overflow")
    : taskBox.classList.remove("overflow");
}

function showMenu(selectedTask) {
  let menuDiv = selectedTask.parentElement.lastElementChild;
  menuDiv.classList.add("show");
  document.addEventListener("click", (e) => {
    if (e.target.tagName != "I" || e.target != selectedTask) {
      menuDiv.classList.remove("show");
    }
  });
}

function updateStatus(selectedTask) {
  let taskName = selectedTask.parentElement.lastElementChild;
  if (selectedTask.checked) {
    taskName.classList.add("checked");
    todos[selectedTask.id].status = "completed";
  } else {
    taskName.classList.remove("checked");
    todos[selectedTask.id].status = "pending";
  }
  localStorage.setItem("todo-list", JSON.stringify(todos));
}

// function editTask(taskId, textName) {
//   editId = taskId;
//   isEditTask = true;
//   taskInput.value = textName;
//   taskInput.focus();
//   taskInput.classList.add("active");
// }

// delete events - used event bubbling in taskbox(parent)
let taskbox = document.querySelector(".task-box");
taskbox.addEventListener("click", deleteTask);
function deleteTask(event) {
  if (event.target.nodeName === "BUTTON") {
    let taskli = document.querySelector(".task");
    taskli.remove();
  }
}

taskbox.addEventListener("click", findCountOfUncheckedTasks);
// count all pending task
function findCountOfUncheckedTasks(e) {
  let noOfUncheckedTasks = document.querySelector(".items-left");
  let countOfUncheckedTasks = 0;
  newInputs = document.querySelectorAll("input#jalena");

  newInputs.forEach((input) => {
    if (input.checked === false) {
      countOfUncheckedTasks++;
    }
  });
  noOfUncheckedTasks.innerText = countOfUncheckedTasks + " tasks left";
}

clearAll.addEventListener("click", () => {
  isEditTask = false;
  todos.splice(0, todos.length);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo();
});

taskInput.addEventListener("keyup", (e) => {
  let userTask = taskInput.value.trim();
  if (e.key == "Enter" && userTask) {
    if (!isEditTask) {
      todos = !todos ? [] : todos;
      let taskInfo = { name: userTask, status: "pending" };
      todos.push(taskInfo);
    } else {
      isEditTask = false;
      todos[editId].name = userTask;
    }
    taskInput.value = "";
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo(document.querySelector("span.active").id);
  }
});
