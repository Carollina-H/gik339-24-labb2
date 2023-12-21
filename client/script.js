// Uppgift 6
async function getPromise() {
  const res = await fetch("http://localhost:3000/users");
  console.log(res.json);
  return res.json();
}

async function getData() {
  const users = await getPromise();
  const listContainer = document.getElementById("listContainer");

  users.forEach((user) => {
    let element = `<div class="bg-${user.color}-200 text-${user.color}-900 p-2 rounded-md border-2 border-${user.color}-400 flex flex-col justify-between"> 
    <p class="box">ID number: ${user.id}</p>
    <p class="box">Name: ${user.firstName} ${user.lastName}</p>
    <p class="box">Username: ${user.username}</p>
    <p class="box">Favorite color: ${user.color}</p>
    </div>`;

    listContainer.insertAdjacentHTML("beforeend", element);
  });
}

getData();
