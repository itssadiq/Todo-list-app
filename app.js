const todoList = [];

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

      updateTasksAndCategory();
    });

  function show() {
    mainElement.classList.add("hide");
    mainElement02.classList.add("show");
  }
}

function showInputsPage(mainElement02, mainElement03) {
  const inputElement = document.querySelector(".js-task");
  const addButton = document.querySelector(".js-add-button");

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

  updateTasksAndCategory();

  taskInputElement.value = "";
  dateElement.value = "";
  categoryElement.value = "";
}

function updateTasksAndCategory() {
  let todoListHTML = "";
  let navbarHTML = "";

  todoList.forEach((todo) => {
    const { name, dueDate, category } = todo;

    const html = `
      <div class="checkbox">
        <div>
          <input type="checkbox" name="task" id="task${name}" />
          <label for="task${name}"> ${name} </label>
          <p>${dueDate}</p>
        </div>
      </div>
    `;

    const categoryHTML = `
      <li class="nav-item">
        <a class="nav-link active" aria-current="page" href="#">${category}</a>
      </li>
    `;
    todoListHTML += html;
    navbarHTML += categoryHTML;
  });

  document.querySelector(".js-task-list").innerHTML = todoListHTML;
  document.querySelector(".js-navbar-nav").innerHTML = navbarHTML;
}
