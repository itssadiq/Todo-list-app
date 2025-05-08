import { todoList } from "./todoList.js";

const completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];

loadPages();

function loadPages() {
  const mainElement = document.querySelector(".js-main");
  const mainElement02 = document.querySelector(".js-main-2");
  const mainElement03 = document.querySelector(".js-main-3");

  showTasksPage(mainElement, mainElement02);
  showInputsPage(mainElement02, mainElement03);
  showCompletedTasks();
  deleteTodo();
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
  deleteTodo();
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
  document.querySelector(".js-category-name").innerHTML = "All Tasks";

  document.querySelector(".js-all-tasks").addEventListener("click", () => {
    document.querySelector(".js-category-name").innerHTML = "All Tasks";

    updateTasks();
  });

  markCompleted();
  deleteTodo();
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
  activateButton();
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
      deleteTodo();
    });
  });
}

function markCompleted() {
  const taskBlock = document.querySelectorAll(".checkbox");

  taskBlock.forEach((block) => {
    const label = block.querySelector("label");
    label.addEventListener("click", () => {
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
    deleteCompletedTask();
  }
}

function deleteCompletedTask() {
  const taskBlock = document.querySelectorAll(".checkbox");

  taskBlock.forEach((block) => {
    block.addEventListener("dblclick", () => {
      const label = block.querySelector("label");
      const labelName = label.innerHTML;

      const taskIndex = completedTasks.findIndex(
        (todo) => todo.name === labelName
      );
      if (taskIndex !== -1) {
        completedTasks.splice(taskIndex, 1);
        saveToStorage();
      }

      setTimeout(() => {
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
      }, 1000);
    });
  });
}

function deleteTodo() {
  const taskBlock = document.querySelectorAll(".checkbox");

  taskBlock.forEach((block) => {
    block.addEventListener("dblclick", () => {
      const label = block.querySelector("label");
      const labelName = label.innerHTML;

      const taskIndex = todoList.findIndex((todo) => todo.name === labelName);
      if (taskIndex !== -1) {
        todoList.splice(taskIndex, 1);
        saveToStorage();
      }

      setTimeout(() => {
        updateTasks();
        updateCategory();
      }, 1000);
    });
  });
}

function activateButton() {
  const buttons = document.querySelectorAll(".category-button");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
    });
  });
}

function saveToStorage() {
  localStorage.setItem("todoList", JSON.stringify(todoList));
  localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
}

function darkMode() {
  let darkbtnToggle = document.querySelector(".theme-checkbox");

  darkbtnToggle.addEventListener("click", () => {
    document.body.classList.toggle("darkmode");
  });
}
// darkMode()
