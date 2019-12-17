const el = document.querySelector(".json-section");

fetch("https://jsonplaceholder.typicode.com/todos")
  .then(response => response.json())
  .then(json => renderJson(json));

const renderJson = json => {
  el.innerHTML = json.title;
  const userTasks = json
    .map(
      x => `<ul class="list">
  <li class ="json-section__userid">${x.userId}</li>
  <li class ="json-section__id">${x.id}</li>
  <li class ="json-section__title">${x.title}</li>
  <li class ="json-section__completed">${x.completed}</li>
  <br>
  </ul>`
    )
    .join("");
  el.innerHTML = userTasks;
};
