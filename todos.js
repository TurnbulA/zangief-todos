const el = document.querySelector(".todo-list-container");

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
        `<div class="todo-list-item" >
            <label class="todo-list-item__input">
              <input type="checkbox"/>
              <span class="todo__check-custom">
                <svg xmlns="http://www.w3.org/2000/svg" width="27.788" height="19.548" viewBox="0 0 27.788 19.548">
                  <path class="c-svg__check" d="M27.445,43.179a1.175,1.175,0,0,0-1.652,0L9.262,59.6,1.994,52.435a1.175,1.175,0,0,0-1.652,0,1.149,1.149,0,0,0,0,1.636l8.1,7.982a1.187,1.187,0,0,0,1.653,0L27.445,44.815a1.147,1.147,0,0,0,0-1.636C26.989,42.727,27.9,43.631,27.445,43.179Z" transform="translate(0 -42.84)"/>
                </svg>
              </span>
              <div class="todo-list-item__text">              
                <p>${title}</p>
              </div>     
            </label>      
            <div class="todo__delete">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
                <path class="c-svg__cross" d="M17.183,15.156,29.513,2.88a1.487,1.487,0,0,0,0-2.118,1.519,1.519,0,0,0-2.137,0L15.057,13.027,2.624.579A1.514,1.514,0,0,0,.487,2.724L12.911,15.163.442,27.577a1.49,1.49,0,0,0,0,2.118,1.519,1.519,0,0,0,2.137,0l12.458-12.4,12.383,12.4a1.514,1.514,0,1,0,2.137-2.145Z" transform="translate(0 -0.135)"/>
          </svg>
            </div>  
        </div>`
    )
    .join("");
  el.innerHTML = userTasks;
};

const deleteEvent = () => {
  const todoListItems = Array.from(document.querySelectorAll(".todo__delete"));

  todoListItems.forEach(todoListItem => {
    todoListItem.addEventListener("click", () => {
      todoListItem.parentNode.remove();
    });
  });
};
