import { todoList } from "./todoList.js";

const completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];

loadPages();

showCompletedTasks();

function loadPages() {
  const mainElement = document.querySelector(".js-main");
  const mainElement02 = document.querySelector(".js-main-2");
  const mainElement03 = document.querySelector(".js-main-3");

  showTasksPage(mainElement, mainElement02);
  showInputsPage(mainElement02, mainElement03);
}

function showTasksPage(mainElement, mainElement02) {
  document
    .querySelector(".js-continue-button")
    .addEventListener("click", () => {
      show();

      updateTasks();
      updateCategory();
    });

  function show() {
    mainElement.classList.add("hide");
    mainElement02.classList.add("show");
  }
}

function showInputsPage(mainElement02, mainElement03) {
  const inputElement = document.querySelector(".js-task");
  const addButton = document.querySelector(".js-add-button");
  const backButton = document.querySelector(".js-back-button");

  inputElement.addEventListener("click", () => {
    show();
  });
  function show() {
    mainElement02.classList.remove("show");
    mainElement03.classList.add("show");
  }
  addButton.addEventListener("click", () => {
    mainElement02.classList.add("show");
    mainElement03.classList.remove("show");
    addTodo();
  });
  backButton.addEventListener("click", () => {
    mainElement02.classList.add("show");
    mainElement03.classList.remove("show");
  });
}

function addTodo() {
  const taskInputElement = document.querySelector(".js-task-input");
  const name = taskInputElement.value;

  const dateElement = document.querySelector(".js-task-date");
  const dueDate = dateElement.value;

  const categoryElement = document.querySelector(".js-task-category");
  const category = categoryElement.value;

  todoList.push({
    name,
    dueDate,
    category,
  });

  taskInputElement.value = "";
  dateElement.value = "";
  categoryElement.value = "";
  updateTasks();
  updateCategory();

  saveToStorage();
}

function updateTasks() {
  let todoListHTML = "";

  todoList.forEach((todo) => {
    const { name, dueDate } = todo;

    const html = `
      <div class="checkbox">
        <div>
          <input type="checkbox" name="task" id="task${name}" />
          <label for="task${name}">${name}</label>
          <p>${dueDate}</p>
        </div>
      </div>
    `;

    todoListHTML += html;
  });

  document.querySelector(".js-task-list").innerHTML = todoListHTML;

  document.querySelector(".js-all-tasks").addEventListener("click", () => {
    document.querySelector(".js-category-name").innerHTML = "All Tasks";

    updateTasks();
  });

  markCompleted();
}

function updateCategory() {
  let categoriesHTML = "";
  const existingCategories = [];

  todoList.forEach((todo) => {
    if (!existingCategories.includes(todo.category)) {
      existingCategories.push(todo.category);
      categoriesHTML += `
       <button class="category-button js-category-button">${todo.category}</button>
      `;
    }
  });

  document.querySelector(".js-categories").innerHTML = categoriesHTML;
  showCategory();
}

function showCategory() {
  const categoryButton = document.querySelectorAll(".js-category-button");

  categoryButton.forEach((button) => {
    button.addEventListener("click", () => {
      let todoListHTML = "";
      todoList.forEach((todo) => {
        if (button.innerHTML === todo.category) {
          const { name, dueDate, category } = todo;

          const html = `
              <div class="checkbox">
                <div>
                  <input type="checkbox" name="task" id="task${name}" />
                  <label for="task${name}">${name}</label>
                  <p>${dueDate}</p>
                </div>
              </div>
            `;

          todoListHTML += html;
          document.querySelector(".js-category-name").innerHTML = category;
        }
      });
      document.querySelector(".js-task-list").innerHTML = todoListHTML;
      markCompleted();
    });
  });
}

function markCompleted() {
  const taskBlock = document.querySelectorAll(".checkbox");

  taskBlock.forEach((block) => {
    block.addEventListener("click", () => {
      const checkbox = block.querySelector("input[type='checkbox']");
      checkbox.checked = true;
      const label = block.querySelector("label");
      const labelName = label.innerHTML;

      const taskIndex = todoList.findIndex((todo) => todo.name === labelName);
      if (taskIndex !== -1) {
        const removedTask = todoList.splice(taskIndex, 1)[0];
        completedTasks.push(removedTask);
      }

      setTimeout(() => {
        updateTasks();
        updateCategory();
      }, 1000);
    });
  });
  saveToStorage();
}
function showCompletedTasks() {
  document
    .querySelector(".js-completed-tasks")
    .addEventListener("click", operation);

  function operation() {
    document.querySelector(".js-category-name").innerHTML = "Completed Tasks";

    let todoListHTML = "";

    completedTasks.forEach((todo) => {
      const { name, dueDate } = todo;

      const html = `
        <div class="checkbox">
          <div>
            <input type="checkbox" name="task" id="task${name}" />
            <label for="task${name}">${name}</label>
            <p>${dueDate}</p>
          </div>
        </div>
      `;

      todoListHTML += html;
    });

    document.querySelector(".js-task-list").innerHTML = todoListHTML;
  }
}

function saveToStorage() {
  localStorage.setItem("todoList", JSON.stringify(todoList));
  localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
}
