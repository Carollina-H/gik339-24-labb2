// Uppgift 6
async function getPromise() {
  const res = await fetch("http://localhost:3000/users");
  const data = await res.json();
  console.log(data);
  return data;
}

// Uppgift 7
async function getData() {
  const users = await getPromise();
  const listContainer = document.getElementById("listContainer");

  users.forEach((user) => {
    let element = `<div class="bg-${user.color}-200 text-${user.color}-900 p-2 rounded-md border-2 border-${user.color}-400 flex flex-col w-[15rem] h-[fit-content] justify-between"> 
    <p>ID: ${user.id}</p>
    <p>Name: ${user.firstName} ${user.lastName}</p>
    <p>Username: ${user.username}</p>
    <p>Favorite color: ${user.color}</p>
    </div>`;

    listContainer.insertAdjacentHTML("beforeend", element);
  });
}

getData();
