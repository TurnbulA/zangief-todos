const el = document.querySelector(".todo-list-container");

fetch("https://jsonplaceholder.typicode.com/todos")
  .then(response => response.json())
  .then(json => renderJson(json))
  .catch(error => console.error(error));

const renderJson = json => {
  el.innerHTML = json.title;
  const userTasks = json
    .map(
      userTask =>
        `<div class = "todo-list-item">

            <label class = "todo-list-item__label">
              <input type="checkbox"/>
              <span class="todo-list-item__check-custom"></span>
              <div class="todo-list-item__text">              
                <p>${userTask.title}</p>
              </div>
            </label>
           
        </div>`
    )
    .join("");

  el.innerHTML = userTasks;
};
