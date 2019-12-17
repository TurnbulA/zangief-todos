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
        `<ul class="list">
          <li class ="json-section__userid">${userTask.userId}</li>
          <li class ="json-section__id">${userTask.id}</li>
          <li class ="json-section__title">${userTask.title}</li>
          <li class ="json-section__completed">${userTask.completed}</li>
        </ul>`
    )
    .join("");

  el.innerHTML = userTasks;
};
