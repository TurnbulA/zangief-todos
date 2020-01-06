const el = document.querySelector(".json-section");

fetch("https://jsonplaceholder.typicode.com/todos")
  .then(response => response.json())
  .then(json => renderJson(json))
  .catch(error => console.error(error));

const renderJson = json => {
  el.innerHTML = json.title;
  const userTasks = json
    .map(
      ({ title }) =>
        `<div class="todo-list-item">
            <label class="todo-list-item__input">
              <input type="checkbox"/>
              <span class="todo__check-custom"></span>
              <div class="todo-list-item__text">              
                <p>${title}</p>
              </div>     
            </label>      
            <div class="todo__delete"></div>  
        </div>`
    )
    .join("");

  el.innerHTML = userTasks;
};
