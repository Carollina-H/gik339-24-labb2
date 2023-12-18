// Uppgift 6

const url = "http://localhost:3000/users";
fetch(url)
  .then((response) => {
    console.log(response);
    return response.json();
  })
  .then((jsonData) => console.log(jsonData));

// Uppgift 7

const newElement = document.createElement("ul");
newElement.classList.add("new-element");
