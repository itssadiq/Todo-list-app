import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

const todoList = [
  {
    name: "Exercise",
    dueDate: "05-05-2025",
    category: "Personal",
  },
];

loadPages();

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

      const taskElement = document.querySelector(".js-task-list");
    });

  function show() {
    mainElement.classList.add("hide");
    mainElement02.classList.add("show");
  }
}

function showInputsPage(mainElement02, mainElement03) {
  const inputElement = document.querySelector(".js-task");

  inputElement.addEventListener("click", () => {
    show();

    loadBackTasks(mainElement02, mainElement03);

    function show() {
      mainElement02.classList.remove("show");
      mainElement03.classList.add("show");
    }
  });
}

function loadBackTasks(mainElement02, mainElement03) {
  document.querySelector(".js-add-button").addEventListener("click", () => {
    mainElement02.classList.add("show");

    mainElement03.classList.remove("show");

    addTodo();
  });
}

function addTodo() {
  const taskInputElement = document.querySelector(".js-task-input");
  const name = taskInputElement.value;

  const dateElement = document.querySelector(".js-task-date");
  const dueDate = dateElement.value;

  const categoryElement = document.querySelector(".js-task-category");
  const category = categoryElement.options[categoryElement.selectedIndex].text;

  todoList.push({
    name,
    dueDate,
    category,
  });

  console.log(todoList);
}
