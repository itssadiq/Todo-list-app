function renderTodoList() {
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
          <div>MON</div>
          <div>25</div>
        </div>
        <div class="date-box">
          <div>TUE</div>
          <div>26</div>
        </div>
        <div class="date-box">
          <div>WED</div>
          <div>27</div>
        </div>
        <div class="date-box">
          <div>THU</div>
          <div>28</div>
        </div>
        <div class="date-box">
          <div>FRI</div>
          <div>29</div>
        </div>
        <div class="date-box">
          <div>SAT</div>
          <div>30</div>
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
      <input
      type="text"
          placeholder="Write a task..."
          class="task js-task"
          />
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
        `;
        mainElement03.classList.add("show");
        mainElement03.innerHTML = main3HTML;

        renderTodoList();
      });
    });
}

renderTodoList();
