const el = document.querySelector(".c-list");

window.addEventListener("DOMContentLoaded", () => {
  fetch("https://jsonplaceholder.typicode.com/todos")
    .then(response => response.json())
    .then(json => {
      renderJson(json);
      svgChange();
      deleteEvent();
    })
    .catch(error => console.error(error));
});

const renderJson = json => {
  el.innerHTML = json.title;
  const userTasks = json
    .map(
      ({ title }) =>
        `<div class="c-list-item c-list-item-off">
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

const svgChange = () => {
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
  console.log(menuControls);
  menuControls.forEach(menuControl => {
    menuControl.addEventListener("click", function(event) {
      const dropdownControl = this.querySelector(".c-menu__dropdown-content");
      if (
        dropdownControl.classList.contains("c-menu__dropdown-content--show")
      ) {
        dropdownControl.classList.add("c-menu__dropdown-content");
        dropdownControl.classList.remove("c-menu__dropdown-content--show");
      } else {
        dropdownControl.classList.add("c-menu__dropdown-content--show");
      }
    });
  });
};
menuToggle();
