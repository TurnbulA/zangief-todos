const el = document.querySelector(".c-list");
let listItems;
let filterApplied = false;
let sortApplied = false;

window.addEventListener("DOMContentLoaded", () => {
  fetch("https://jsonplaceholder.typicode.com/todos")
    .then(response => response.json())
    .then(json => {
      renderJson(json);
      listItems = renderJson(json);
      filterCompletedItems();
      deleteEvent();
      filterApply();
    })
    .catch(error => console.error(error));
});

const renderJson = json => {
  el.innerHTML = json.title;
  const userTasks = json
    .map(
      (item, index) =>
        `<div class="c-list-item c-list-item-off" data-id=${index} >
            <label class="c-list-item__input">
              <input type="checkbox"/>
              <span class="c-list-item__input--custom">
                <svg xmlns="http://www.w3.org/2000/svg" class="c-list-item__svg--tick" width="27.788" height="19.548" viewBox="0 0 27.788 19.548">
                  <path class="c-svg__check" d="M27.445,43.179a1.175,1.175,0,0,0-1.652,0L9.262,59.6,1.994,52.435a1.175,1.175,0,0,0-1.652,0,1.149,1.149,0,0,0,0,1.636l8.1,7.982a1.187,1.187,0,0,0,1.653,0L27.445,44.815a1.147,1.147,0,0,0,0-1.636C26.989,42.727,27.9,43.631,27.445,43.179Z" transform="translate(0 -42.84)"/>
                </svg>
              </span>
              <div class="c-list-item__text">              
                <p>${item.title}</p>
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

  return userTasks;
};

const filterCompletedItems = () => {
  const listItems = Array.from(document.querySelectorAll(".c-list-item"));
  const selectItem = element => {
    element.classList.remove("c-list-item-off");
    element.classList.add("c-list-item-on");
    element.querySelector('[type="checkbox"]').checked = true;
  };
  const deselectItem = element => {
    element.classList.remove("c-list-item-on");
    element.classList.add("c-list-item-off");
    element.querySelector('[type="checkbox"]').checked = false;
  };
  listItems.forEach(listItem => {
    listItem.addEventListener("click", function(event) {
      event.preventDefault();
      this.classList.contains("c-list-item-off")
        ? selectItem(this)
        : deselectItem(this);
    });
  });
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

const menuToggle = () => {
  const menuControls = [
    ...document.querySelectorAll(".c-menu-control__has-dropdown")
  ];
  menuControls.forEach(menuControl => {
    menuControl.addEventListener("click", function(event) {
      const dropdownControl = this.querySelector(".c-menu__dropdown-content");
      dropdownControl.classList.contains("c-menu__dropdown-content---show")
        ? dropdownControl.classList.remove("c-menu__dropdown-content---show")
        : dropdownControl.classList.add("c-menu__dropdown-content---show");
    });
  });
};
menuToggle();

const filterApply = () => {
  const filterControls = [
    ...document.querySelectorAll(".c-menu__dropdown-item")
  ];
  filterControls.forEach(filterControl => {
    filterControl.addEventListener("click", function(event) {
      const filterItems = [...document.querySelectorAll("[data-control]")];
      const filterItem = this.getAttribute("data-control");
      switch (filterItem) {
        case "filter--complete":
          filterText("filter--complete");
          filterComplete();
          filterApplied = true;
          break;
        case "filter--incomplete":
          filterText("filter--incomplete");
          filterIncomplete();
          filterApplied = true;
          break;
        case "sort--alpha":
          sortText("sort--alpha");
          sortAlpha();
          sortApplied = true;
          break;
        case "sort--rev-alpha":
          sortText("sort--rev-alpha");
          sortRevAlpha();
          sortApplied = true;
          break;
        default:
          console.log("Default");
          break;
      }
    });
  });
};

const sortItems = items =>
  items.sort(function(a, b) {
    if (a.textContent < b.textContent) {
      return -1;
    } else if (a.textContent > b.textContent) {
      return 1;
    } else {
      return 0;
    }
  });

const sortAlpha = () => {
  const listItems = [...document.querySelectorAll(".c-list-item")];
  const listSorted = sortItems(listItems);
  listItems.forEach((listItem, index) => {
    listItem.parentNode.appendChild(listSorted[index]);
  });
};

const sortRevAlpha = () => {
  const listItems = [...document.querySelectorAll(".c-list-item")];
  const listSorted = sortItems(listItems).reverse();
  listItems.forEach((listItem, index) => {
    listItem.parentNode.appendChild(listSorted[index]);
  });
};

const filterComplete = () => {
  const completeItems = [...document.querySelectorAll(".c-list-item-on")];
  const incompleteItems = [...document.querySelectorAll(".c-list-item-off")];
  completeItems.forEach(completeItem => {
    if (completeItem.classList.contains("c-list-item--hide")) {
      completeItem.classList.remove("c-list-item--hide");
    }
  });
  incompleteItems.forEach(incompleteItem => {
    incompleteItem.classList.add("c-list-item--hide");
  });
};

const filterIncomplete = () => {
  const completeItems = [...document.querySelectorAll(".c-list-item-on")];
  const incompleteItems = [...document.querySelectorAll(".c-list-item-off")];
  incompleteItems.forEach(incompleteItem => {
    if (incompleteItem.classList.contains("c-list-item--hide")) {
      incompleteItem.classList.remove("c-list-item--hide");
    }
  });
  completeItems.forEach(completeItem => {
    completeItem.classList.add("c-list-item--hide");
  });
};

const FILTER_RESETS = {
  "filter--complete": "Filter: Completed items",
  "filter--incomplete": "Filter: Incompleted items",
  "sort--alpha": "Sort: Alphabetical",
  "sort--rev-alpha": "Sort: Reverse alphabetical"
};

const filterText = filterType => {
  const buttonColor = document.querySelector(".c-menu__dropdown-filter");
  const filterInner = document.querySelector(".c-menu-status__text-filter");
  filterInner.textContent = FILTER_RESETS[filterType];
  switch (filterType) {
    case "filter--complete":
      const completeChange = document.querySelector(".c-menu-status-filter");
      completeChange.classList.remove("c-menu-status--hide");
      completeChange.classList.add("c-menu-status--show");
      buttonColor.classList.add("c-menu__dropdown-control--colored");
      break;
    case "filter--incomplete":
      const incompleteChange = document.querySelector(".c-menu-status-filter");
      incompleteChange.classList.remove("c-menu-status--hide");
      incompleteChange.classList.add("c-menu-status--show");
      buttonColor.classList.add("c-menu__dropdown-control--colored");
      break;
  }
};

const sortText = sortType => {
  const sortColor = document.querySelector(".c-menu__dropdown-sort");
  const sortInner = document.querySelector(".c-menu-status__text-sort");
  sortInner.textContent = FILTER_RESETS[sortType];
  switch (sortType) {
    case "sort--alpha":
      const alphaChange = document.querySelector(".c-menu-status-sort");
      alphaChange.classList.remove("c-menu-status--hide");
      alphaChange.classList.add("c-menu-status--show");
      sortColor.classList.add("c-menu__dropdown-control--colored");
      break;
    case "sort--rev-alpha":
      const revAlphaChange = document.querySelector(".c-menu-status-sort");
      revAlphaChange.classList.remove("c-menu-status--hide");
      revAlphaChange.classList.add("c-menu-status--show");
      sortColor.classList.add("c-menu__dropdown-control--colored");
      break;
  }
};

const filterReset = () => {
  document
    .querySelector(".c-menu-status__reset")
    .addEventListener("click", () => {
      const resetItems = [...document.querySelectorAll(".c-list-item")];
      const buttonColor = document.querySelector(
        ".c-menu__dropdown-control--colored"
      );
      const filterShow = document.querySelector(".c-menu-status--show");
      resetItems.forEach(resetItem => {
        if (resetItem.classList.contains("c-list-item--hide")) {
          resetItem.classList.remove("c-list-item--hide");
          buttonColor.classList.remove("c-menu__dropdown-control--colored");
          filterShow.classList.remove("c-menu-status--show");
          filterShow.classList.add("c-menu-status--hide");
        }
        buttonReset(".c-menu-status-filter", ".c-menu__dropdown-filter");
      });
    });
};
filterReset();

const buttonReset = (content, container) => {
  const itemContent = document.querySelector(content);
  const itemContainer = document.querySelector(container);
  itemContent.classList.remove("c-menu-status--show");
  itemContent.classList.add("c-menu-status--hide");
  itemContainer.classList.remove("c-menu__dropdown-control--colored");
};

const handleReset = () => {
  const resetButtons = [...document.querySelectorAll("[data-reset]")];

  resetButtons.forEach(resetButton => {
    resetButton.addEventListener("click", function() {
      buttonReset(".c-menu-status-sort", ".c-menu__dropdown-sort");
      const currentlyRenderedListItems = [
        ...document.querySelectorAll(".c-list-item")
      ];
      const resetType = this.getAttribute("data-reset");

      if (resetType === "sort") {
        const orderedList = currentlyRenderedListItems.sort(function(a, b) {
          if (
            Number(a.getAttribute("data-id")) <
            Number(b.getAttribute("data-id"))
          ) {
            return -1;
          } else if (
            Number(a.getAttribute("data-id")) >
            Number(b.getAttribute("data-id"))
          ) {
            return 1;
          } else {
            return 0;
          }
        });
        currentlyRenderedListItems.forEach((currentlyRenderedItem, index) => {
          currentlyRenderedItem.parentNode.appendChild(orderedList[index]);
        });
      }
    });
  });
};

handleReset();
