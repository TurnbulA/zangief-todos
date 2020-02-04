const el = document.querySelector(".c-list");
let mainItems;

window.addEventListener("DOMContentLoaded", () => {
  fetch("https://jsonplaceholder.typicode.com/todos")
    .then(response => response.json())
    .then(json => {
      mainItems = renderJson(json);
      filterCompletedItems();
      deleteEvent();
      filterApply();
    })
    .catch(error => console.error(error));
});

const renderJson = json => {
  const userTasks = json
    .map(
      (item, index) =>
        `<li class="c-list-item c-list-item-off" data-id=${index}>
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
        </li>`
    )
    .join("");

  el.innerHTML = userTasks;

  return userTasks;
};

const filterCompletedItems = () => {
  const mainItems = Array.from(document.querySelectorAll(".c-list-item"));
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
  mainItems.forEach(listItem => {
    listItem.addEventListener("click", function(event) {
      event.preventDefault();
      this.classList.contains("c-list-item-off")
        ? selectItem(this)
        : deselectItem(this);
    });
  });
};

const deleteEvent = () => {
  const todomainItems = Array.from(
    document.querySelectorAll(".c-list-item__delete")
  );
  todomainItems.forEach(todoListItem => {
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
      event.stopPropagation();
      const dropdownControl = this.querySelector(".c-menu__dropdown-content");

      dropdownControl.classList.contains("c-menu__dropdown-content--show")
        ? dropdownControl.classList.remove("c-menu__dropdown-content--show")
        : dropdownControl.classList.add("c-menu__dropdown-content--show");
    });
  });
};
menuToggle();

const dropdownItems = [
  ...document.querySelectorAll(".c-menu__dropdown-content")
];
dropdownItems.forEach(dropdownItem => {
  document.querySelector("body").addEventListener("click", function(event) {
    if (dropdownItem.classList.contains("c-menu__dropdown-content--show")) {
      dropdownItem.classList.remove("c-menu__dropdown-content--show");
    }
  });
});

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
  const mainItems = [...document.querySelectorAll(".c-list-item")];
  const listSorted = sortItems(mainItems);
  mainItems.forEach((listItem, index) => {
    listItem.parentNode.appendChild(listSorted[index]);
  });
};

const sortRevAlpha = () => {
  const mainItems = [...document.querySelectorAll(".c-list-item")];
  const listSorted = sortItems(mainItems).reverse();
  mainItems.forEach((listItem, index) => {
    listItem.parentNode.appendChild(listSorted[index]);
  });
};

const filterComplete = () => {
  const completeItems = [...document.querySelectorAll(".c-list-item-on")];
  const incompleteItems = [...document.querySelectorAll(".c-list-item-off")];
  completeItems.forEach(completeItem => {
    if (completeItem.classList.contains("u-display--none")) {
      completeItem.classList.remove("u-display--none");
    }
  });
  incompleteItems.forEach(incompleteItem => {
    incompleteItem.classList.add("u-display--none");
  });
};

const filterIncomplete = () => {
  const completeItems = [...document.querySelectorAll(".c-list-item-on")];
  const incompleteItems = [...document.querySelectorAll(".c-list-item-off")];
  incompleteItems.forEach(incompleteItem => {
    if (incompleteItem.classList.contains("u-display--none")) {
      incompleteItem.classList.remove("u-display--none");
    }
  });
  completeItems.forEach(completeItem => {
    completeItem.classList.add("u-display--none");
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
      completeChange.classList.remove("u-display--none");
      completeChange.classList.add("u-display--show");
      buttonColor.classList.add("u-color--active");
      break;
    case "filter--incomplete":
      const incompleteChange = document.querySelector(".c-menu-status-filter");
      incompleteChange.classList.remove("u-display--none");
      incompleteChange.classList.add("u-display--show");
      buttonColor.classList.add("u-color--active");
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
      alphaChange.classList.remove("u-display--none");
      alphaChange.classList.add("u-display--show");
      sortColor.classList.add("u-color--active");
      break;
    case "sort--rev-alpha":
      const revAlphaChange = document.querySelector(".c-menu-status-sort");
      revAlphaChange.classList.remove("u-display--none");
      revAlphaChange.classList.add("u-display--show");
      sortColor.classList.add("u-color--active");
      break;
  }
};

const filterReset = () => {
  document
    .querySelector(".c-menu-status__reset")
    .addEventListener("click", () => {
      const resetItems = [...document.querySelectorAll(".c-list-item")];
      const buttonColor = document.querySelector(".u-color--active");
      const filterShow = document.querySelector(".u-display--show");

      resetItems.forEach(resetItem => {
        if (resetItem.classList.contains("u-display--none")) {
          resetItem.classList.remove("u-display--none");
        }
        buttonReset(".c-menu-status-filter", ".c-menu__dropdown-filter");
      });
    });
};
filterReset();

const buttonReset = (content, container) => {
  const itemContent = document.querySelector(content);
  const itemContainer = document.querySelector(container);
  itemContent.classList.remove("u-display--show");
  itemContent.classList.add("u-display--none");
  itemContainer.classList.remove("u-color--active");
};

const handleReset = () => {
  const resetButtons = [...document.querySelectorAll("[data-reset]")];

  resetButtons.forEach(resetButton => {
    resetButton.addEventListener("click", function() {
      const currentlyRenderedmainItems = [
        ...document.querySelectorAll(".c-list-item")
      ];
      const resetType = this.getAttribute("data-reset");

      if (resetType === "sort") {
        const orderedList = currentlyRenderedmainItems.sort(function(a, b) {
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
        currentlyRenderedmainItems.forEach((currentlyRenderedItem, index) => {
          currentlyRenderedItem.parentNode.appendChild(orderedList[index]);
        });
        buttonReset(".c-menu-status-sort", ".c-menu__dropdown-sort");
      }
    });
  });
};

handleReset();

const foundResults = () => {
  const searchInput = document.querySelector(".c-menu-control__search-input");
  const searchButton = document.querySelector(".c-search__input-svg");
  const searchText = document.querySelector(".c-menu-status-search p");
  const searchTextContainer = document.querySelector(".c-menu-status-search");

  searchInput.addEventListener("keydown", function(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      searchTextContainer.classList.remove("u-display--none");
      searchTextContainer.classList.add("u-display--show");
      searchColorChange();
      searchInputReset();
      searchFunction();
    }
  });

  searchButton.addEventListener("click", function(e) {
    e.preventDefault();
    searchText.textContent = searchInput.value;
    searchTextContainer.classList.remove("u-display--none");
    searchTextContainer.classList.add("u-display--show");
    searchColorChange();
    searchInputReset();
    searchFunction();
  });
};
foundResults();

const searchColorChange = () => {
  const searchInput = document.querySelector(".c-menu-control__search-input");
  const searchControl = document.querySelector(".c-menu-control__search");
  searchInput.classList.add("c-menu-conrol-input--active");
  searchControl.classList.add("c-form--active");
};

const searchInputReset = () => {
  const searchItems = [...document.querySelectorAll(".c-list-item")];

  searchItems.forEach(searchItem => {
    if (searchItem.classList.contains("u-display--none-search")) {
      searchItem.classList.remove("u-display--none-search");
    } else if (searchItem.classList.contains("active-search")) {
      searchItem.classList.remove("active-search");
    }
  });
};

const searchFunction = () => {
  const searchText = document.querySelector(".c-menu-status-search p");
  const input = document.querySelector(".c-menu-control__search-input");
  const filter = input.value.toUpperCase();
  const ul = document.querySelector(".c-list");
  const li = [...ul.getElementsByTagName("li")];
  let foundResults = false;
  li.forEach((item, index) => {
    const a = item.getElementsByTagName("p")[0];
    const textValue = a.textContent;

    if (textValue.toUpperCase().indexOf(filter) > -1) {
      item.classList.add("active-search");
      foundResults = true;
    } else {
      item.classList.add("u-display--none-search");
    }
  });
  if (foundResults) {
    searchText.textContent = input.value;
  } else {
    searchText.innerHTML = `No results for search term "${input.value}". Please try another search term.`;
  }
  document.querySelector("form").reset();
};

const searchButtonReset = () => {
  const searchResetButton = document.querySelector(
    ".c-menu-status__reset-search"
  );
  const searchTextContainer = document.querySelector(".c-menu-status-search");
  const searchInput = document.querySelector(".c-menu-control__search-input");
  const searchControl = document.querySelector(".c-menu-control__search");
  searchResetButton.addEventListener("click", () => {
    searchInputReset();

    searchInput.classList.remove("c-menu-conrol-input--active");
    searchControl.classList.remove("c-form--active");
    searchTextContainer.classList.remove("u-display--show");
    searchTextContainer.classList.add("u-display--none");
  });
};
searchButtonReset();
