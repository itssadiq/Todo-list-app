function renderTodoList() {
  const mainElement = document.querySelector(".js-main");
  const mainElement02 = document.querySelector(".js-main-2");
  document
    .querySelector(".js-continue-button")
    .addEventListener("click", () => {
      mainElement.classList.add("hide");
      mainElement02.classList.add("show");
      html = `
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

      <div class="task-input">
        <input
          type="text"
          placeholder="Write a task..."
          class="task-input-field js-task-input"
        />
        <button class="task-add-button">Add</button>
      </div>
  `;
      mainElement02.innerHTML = html;
      const inputElement = document.querySelector(".js-task-input");

      inputElement.addEventListener("click", () => {
        console.log("clicked");
        mainElement02.classList.remove("show");
        mainElement02.classList.add("hide");
        renderTodoList();
      });
    });
}

renderTodoList();
