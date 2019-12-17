const el = document.querySelector(".json-section");

fetch("https://jsonplaceholder.typicode.com/todos")
  .then(response => response.json())
  .then(json => renderJson(json))
  .catch(error => console.error(error));

const renderJson = json => {
  el.innerHTML = json.title;
  const userTasks = json
    .map(
      userTask =>
        `<div class = "json-section__title">

            <label class = "json-section__title--label">
              <input type = "checkbox"/>
              <span class = "check-custom"></span>
              <div class ="json-section__title--text">
              <p>${userTask.title}</p>
            </div>
            </label>
           
        </div>`
    )
    .join("");

  el.innerHTML = userTasks;
};
