import { todoList } from "./data.js";
import { completedTasks } from "./data.js";

export function showTasksPage(mainElement, mainElement02) {
  document
    .querySelector(".js-continue-button")
    .addEventListener("click", () => {
      show();
      updateTasks();
      updateCategory();
      bindCategoryButtons();
    });

  function show() {
    mainElement.classList.add("hide");
    mainElement02.classList.add("show");
  }
}

export function showInputsPage(mainElement02, mainElement03) {
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
    const taskInputElement = document.querySelector(".js-task-input");
    const dateElement = document.querySelector(".js-task-date");
    const categoryElement = document.querySelector(".js-task-category");
    if (
      !taskInputElement.value.trim() ||
      !dateElement.value.trim() ||
      !categoryElement.value.trim()
    ) {
      alert("Please fill in all fields.");
      return;
    }
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
  const name = taskInputElement.value.trim();

  const dateElement = document.querySelector(".js-task-date");
  const dueDate = dateElement.value.trim();

  const categoryElement = document.querySelector(".js-task-category");
  const category = categoryElement.value.trim();

  if (!name || !dueDate || !category) {
    alert("Please fill in all fields.");
    return;
  }

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
  bindCategoryButtons();

  saveToStorage();
  deleteTodo();
}

function renderTaskList() {
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
}

function updateTasks() {
  renderTaskList();
  document.querySelector(".js-category-name").innerHTML = "All Tasks";
  setActiveCategoryButton("all-task");
  markCompleted();
  deleteTodo();
}

function updateCategory() {
  const tasksButtonsEl = document.querySelector(".tasks-buttons");
  // Only remove old category buttons, keep All and Completed
  tasksButtonsEl
    .querySelectorAll(".js-category-button")
    .forEach((btn) => btn.remove());

  let categoriesHTML = "";
  const existingCategories = [];

  todoList.forEach((todo) => {
    if (todo.category && !existingCategories.includes(todo.category)) {
      existingCategories.push(todo.category);
      categoriesHTML += `
         <button class="category-button js-category-button">${todo.category}</button>
        `;
    }
  });

  tasksButtonsEl.innerHTML += categoriesHTML;
  bindCategoryButtons();
}

function bindCategoryButtons() {
  const allButtons = document.querySelectorAll(".category-button");
  allButtons.forEach((btn) => {
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
  });

  const categoryButtons = document.querySelectorAll(".js-category-button");
  categoryButtons.forEach((button) => {
    if (
      !button.classList.contains("js-all-tasks") &&
      !button.classList.contains("js-completed-tasks")
    ) {
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
        setActiveCategoryButton(null, button);
      });
    }
  });

  const allBtn = document.querySelector(".js-all-tasks");
  if (allBtn) {
    allBtn.addEventListener("click", () => {
      updateTasks();
      setActiveCategoryButton("all-task");
    });
  }

  const completedBtn = document.querySelector(".js-completed-tasks");
  if (completedBtn) {
    completedBtn.addEventListener("click", () => {
      document.querySelector(".js-category-name").innerHTML = "Completed Tasks";
      renderCompletedTasks();
      deleteCompletedTask();
      setActiveCategoryButton("completed-tasks");
    });
  }
}

function setActiveCategoryButton(type, btn) {
  document
    .querySelectorAll(".category-button")
    .forEach((b) => b.classList.remove("active"));
  if (type === "all-task") {
    const allBtn = document.querySelector(".js-all-tasks");
    if (allBtn) allBtn.classList.add("active");
  } else if (type === "completed-tasks") {
    const completedBtn = document.querySelector(".js-completed-tasks");
    if (completedBtn) completedBtn.classList.add("active");
  } else if (btn) {
    btn.classList.add("active");
  }
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
        bindCategoryButtons();
      }, 1000);
    });
  });

  saveToStorage();
}

function renderCompletedTasks() {
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
        renderCompletedTasks();
        deleteCompletedTask();
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
        bindCategoryButtons();
      }, 1000);
    });
  });
}

function saveToStorage() {
  localStorage.setItem("todoList", JSON.stringify(todoList));
  localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
}
