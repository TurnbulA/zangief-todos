const el = document.querySelector(".c-list");

fetch("https://jsonplaceholder.typicode.com/todos")
  .then(response => response.json())
  .then(json => {
    renderJson(json);
    deleteEvent();
  })
  .catch(error => console.error(error));

const renderJson = json => {
  el.innerHTML = json.title;
  const userTasks = json
    .map(
      ({ title }) =>
        `<div class="c-list-item" >
            <label class="c-list-item__input">
              <input type="checkbox"/>
              <span class="c-list-item__input--custom">
                <svg xmlns="http://www.w3.org/2000/svg" class="c-list-item__svg--tick" width="27.788" height="19.548" viewBox="0 0 27.788 19.548">
                  <path class="c-svg__check" d="M27.445,43.179a1.175,1.175,0,0,0-1.652,0L9.262,59.6,1.994,52.435a1.175,1.175,0,0,0-1.652,0,1.149,1.149,0,0,0,0,1.636l8.1,7.982a1.187,1.187,0,0,0,1.653,0L27.445,44.815a1.147,1.147,0,0,0,0-1.636C26.989,42.727,27.9,43.631,27.445,43.179Z" transform="translate(0 -42.84)"/>
                </svg>
              </span>
              <div class="c-list-item__text">              
                <p>${title}</p>
              </div>     
            </label>      
            <div class="c-list-item__delete">
              <svg xmlns="http://www.w3.org/2000/svg" class="c-list-item__delete__svg" width="30" height="30" viewBox="0 0 30 30">
                <path class="c-list-item__svg--cross" d="M17.183,15.156,29.513,2.88a1.487,1.487,0,0,0,0-2.118,1.519,1.519,0,0,0-2.137,0L15.057,13.027,2.624.579A1.514,1.514,0,0,0,.487,2.724L12.911,15.163.442,27.577a1.49,1.49,0,0,0,0,2.118,1.519,1.519,0,0,0,2.137,0l12.458-12.4,12.383,12.4a1.514,1.514,0,1,0,2.137-2.145Z" transform="translate(0 -0.135)"/>
          </svg>
            </div>  
        </div>`
    )
    .join("");
  el.innerHTML = userTasks;
};

const deleteEvent = () => {
  const todoListItems = Array.from(
    document.querySelectorAll(".c-list-item__delete")
  );
  todoListItems.forEach(todoListItem => {
    todoListItem.addEventListener("click", () => {
      todoListItem.parentNode.remove();
    });
  });
};

const menuToggle = (buttonClassName, dropdownClassName) => {
  const dropdown = document.querySelector(buttonClassName);
  dropdown.addEventListener("click", () => {
    const dropContent = document.querySelector(dropdownClassName);
    if (dropContent.style.display === "none") {
      dropContent.style.display = "block";
    } else {
      dropContent.style.display = "none";
    }
  });
};
menuToggle(".c-menu-control__filter", ".c-menu-control__dropdown-filter");
menuToggle(".c-menu-control__sort", ".c-menu-control__dropdown-sort");

const applyFilter = element => {
  document.querySelector(element).addEventListener("click", () => {
    const classList = document.querySelector(element).classList;
    if (classList.contains("c-menu-control__dropdown--complete")) {
      filterActive(".c-menu-control__dropdown--complete");
    } else if (classList.contains("c-menu-control__dropdown--incomplete")) {
      filterActive(".c-menu-control__dropdown--incomplete");
    } else if (classList.contains("c-menu-control__dropdown--alphabetical")) {
      filterActive(".c-menu-control__dropdown--alphabetical");
    } else if (classList.contains("c-menu-control__dropdown--reverseAlpha")) {
      filterActive(".c-menu-control__dropdown--reverseAlpha");
    } else {
      error => console.error(error);
    }
  });
};
applyFilter(".c-menu-control__dropdown--complete");
applyFilter(".c-menu-control__dropdown--incomplete");
applyFilter(".c-menu-control__dropdown--alphabetical");
applyFilter(".c-menu-control__dropdown--reverseAlpha");

const filterActive = buttonClassName => {
  const dropButton = document.querySelector(buttonClassName);
  dropButton.addEventListener("click", () => {
    const activeContent = document.querySelector(
      ".c-menu-control--active-text"
    );
    const reset = document.querySelector(".c-menu-control--active-reset");
    if (dropButton.classList.contains("c-menu-control__dropdown--complete")) {
      document.querySelector(".c-menu-control--active").style.display = "block";
      activeContent.classList.add("c-menu-control--active-left");
      document.querySelector(".c-menu-control--active-left").innerHTML =
        "Filter: Completed items";
      reset.innerHTML = "Reset filter";
      document.querySelector(
        ".c-menu-control__dropdown--content"
      ).style.display = "none";
    } else if (
      dropButton.classList.contains("c-menu-control__dropdown--incomplete")
    ) {
      activeContent.classList.add("c-menu-control--active-left");
      document.querySelector(".c-menu-control--active").style.display = "block";
      document.querySelector(".c-menu-control--active-left").innerHTML =
        "Filter: Incompleted items";
      reset.innerHTML = "Reset filter";
      document.querySelector(
        ".c-menu-control__dropdown--content"
      ).style.display = "none";
    } else if (
      dropButton.classList.contains("c-menu-control__dropdown--alphabetical")
    ) {
      document.querySelector(".c-menu-control--active").style.display = "block";
      activeContent.classList.add("c-menu-control--active-middle");
      document.querySelector(".c-menu-control--active-middle").innerHTML =
        "Sort: Alphabetical";
      reset.innerHTML = "Reset sort";
      document.querySelector(".c-menu-control__dropdown-sort").style.display =
        "none";
      sortAlphabetical();
    } else if (
      dropButton.classList.contains("c-menu-control__dropdown--reverseAlpha")
    ) {
      document.querySelector(".c-menu-control--active").style.display = "block";
      activeContent.classList.add("c-menu-control--active-middle");
      document.querySelector(".c-menu-control--active-middle").innerHTML =
        "Sort: Reverse alphabetical";
      reset.innerHTML = "Reset sort";
      document.querySelector(".c-menu-control__dropdown-sort").style.display =
        "none";
    } else {
      error => console.error(error);
    }
  });
};

const filterOff = () => {
  const resetButton = document.querySelector(".c-menu-control--active-reset");
  resetButton.addEventListener("click", () => {
    document.querySelector(".c-menu-control--active").style.display = "none";
  });
};
filterOff();
