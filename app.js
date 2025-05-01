import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

function renderTodoList() {
  const today = dayjs();
  const currentDay = today.format("ddd");
  const currentDate = today.format("D");

  const yesterday = today.subtract(1, "day");
  const yesterdayDay = yesterday.format("ddd");
  const yesterdayDate = yesterday.format("D");

  const tomorrow = today.add(1, "day");
  const tomorrowDay = tomorrow.format("ddd");
  const tomorrowDate = tomorrow.format("D");

  const day2 = today.add(2, "day");
  const day2day = day2.format("ddd");
  const day2date = day2.format("D");

  const day3 = today.add(3, "day");
  const day3day = day3.format("ddd");
  const day3date = day3.format("D");

  const day4 = today.add(4, "day");
  const day4day = day4.format("ddd");
  const day4date = day4.format("D");

  const mainElement = document.querySelector(".js-main");
  const mainElement02 = document.querySelector(".js-main-2");
  const mainElement03 = document.querySelector(".js-main-3");

  document
    .querySelector(".js-continue-button")
    .addEventListener("click", () => {
      mainElement.classList.add("hide");
      mainElement02.classList.add("show");
      let main2HTML = `
          <h2>Today</h2>

          <div class="date">
            <div class="date-box">
              <div>${yesterdayDay}</div>
              <div>${yesterdayDate}</div>
            </div>
            <div class="date-box current-date">
              <div>${currentDay}</div>
              <div>${currentDate}</div>
            </div>
            <div class="date-box">
              <div>${tomorrowDay}</div>
              <div>${tomorrowDate}</div>
            </div>
            <div class="date-box">
              <div>${day2day}</div>
              <div>${day2date}</div>
            </div>
            <div class="date-box">
              <div>${day3day}</div>
              <div>${day3date}</div>
            </div>
            <div class="date-box">
              <div>${day4day}</div>
              <div>${day4date}</div>
            </div>
          </div>

          <p class="category-name">DESIGN</p>
          <div class="checkbox">
            <input type="checkbox" name="" id="" /> Create icons for a dashboard
          </div>
          <div class="checkbox">
            <input type="checkbox" name="" id="" /> Prepare a design presentation
          </div>

          <p class="category-name">PERSONAL</p>
          <div class="checkbox">
            <input type="checkbox" name="" id="" /> Stretch for 15 minutes
          </div>
          <div class="checkbox">
            <input type="checkbox" name="" id="" /> Plan your meal
          </div>
          <div class="checkbox">
            <input type="checkbox" name="" id="" /> Review daily goals before
            sleeping. Add some new if time permits
          </div>

          <p class="category-name">HOUSE</p>
          <div class="checkbox">
            <input type="checkbox" name="" id="" /> Water indoor plants
          </div>

          <div class="input-div">
            <input type="text" placeholder="Write a task..." class="task js-task" />
            <button class="task-add">Add</button>
          </div>
          `;
      mainElement02.innerHTML = main2HTML;

      const inputElement = document.querySelector(".js-task");

      inputElement.addEventListener("click", () => {
        console.log("clicked");
        mainElement02.classList.remove("show");
        mainElement02.classList.add("hide");

        let main3HTML = `
          <input type="text" class="task-input" placeholder="Write a task..." />
          <input type="date" class="task-date" />
          <select name="" id="" class="task-category">
            <option value="" selected>Select task category</option>
            <option value="">Personal</option>
            <option value="">Work</option>
            <option value="">Self Improvement</option>
            <option value="">Study</option>
          </select>
          <button class="add-button"></button>
        `;
        mainElement03.classList.add("show");
        mainElement03.innerHTML = main3HTML;

        renderTodoList();
      });
    });
}

renderTodoList();
