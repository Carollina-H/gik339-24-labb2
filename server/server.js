// Uppgift 2
//New
const sqlite = require("sqlite3").verbose();
/* Skapar ny koppling till databas-fil som skapades tidigare. */
const db = new sqlite.Database("./gik339.db");
//new ^^
const express = require("express");
const server = express();

server
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");

    next();
  });

// server.get("/users", (req, res) => {
//   const method = req.method;
//   const url = req.url;
//   res.send(`Du gjorde en ${method}-förfrågan till url:en ${url}.`);
// });

//servern
server.listen(3000, () => {
  console.log("Server running on http://localhost:3000.");
});

// Uppgift 3

server.get("/users", (req, res) => {
  const db = new sqlite3.Database("./gik339-labb2.db");
  const sql = "SELECT * FROM users";
  db.all(sql, (err, rows) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(rows);
    }
  });
});

server.get("/users/:id", (req, res) => {
  const id = req.params.id;
  const db = new sqlite3.Database("./gik339-labb2.db");
  const sql = `SELECT * FROM users WHERE id = ${id}`;
  db.all(sql, (err, rows) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(rows[0]);
    }
  });
});
// Uppgift 4
// Uppgift 5
//new code for server.js

server.post("/users", (req, res) => {
  const user = req.body;
  const sql = `INSERT INTO users(firstName, lastName, username, color) VALUES (?,?,?,?)`;
  db.run(sql, Object.values(user), (err) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.send("Användaren sparades");
    }
  });
});

//remember to go into the server terminal and run the code "cd server" as well as "npm start" i order to start up nodemon and the server!

server.put("/users", (req, res) => {
  const bodyData = req.body;

  const id = bodyData.id;
  const user = {
    firstName: bodyData.firstName,
    lastName: bodyData.lastName,
    username: bodyData.username,
    color: bodyData.color,
  };

  //Create and SEND data in POSTMAN in PUT/x-www-form-urlencoded
  //(KEY: id, firstName, lastName, username, color) (VALUE: 1, Nova, Söderlund Granzer, lillianlovefall, purple)

  let updateString = "";
  const columnsArray = Object.keys(user);
  columnsArray.forEach((column, i) => {
    updateString += `${column}="${user[column]}"`;
    if (i !== columnsArray.length - 1) updateString += ",";
  });
  const sql = `UPDATE users SET ${updateString} WHERE id = ${id}`;

  db.run(sql, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.send("Användaren uppdaterades");
    }
  });
  //UPDATE users SET firstName="Nova",lastName="Söderlund Granzer" WHERE id=1
});

server.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM users WHERE id = ${id}`;

  db.run(sql, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.send("Användaren borttagen");
    }
  });
});
