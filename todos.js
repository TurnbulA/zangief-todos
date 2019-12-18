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
        `<div class = "todo-list__title">

            <label class = "todo-list--label">
              <input type="checkbox"/>
              <span class="todo--check-custom"></span>
              <div class="todo-list--text">              
                <p>${userTask.title}</p>
              </div>
            </label>
           
        </div>`
    )
    .join("");

  el.innerHTML = userTasks;
};
