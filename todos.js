const el = document.querySelector(".jsonSection");

fetch("https://jsonplaceholder.typicode.com/todos/1")
  .then(response => response.json())
  .then(json => (el.innerHTML = json.title));
