// Uppgift 2
const sqlite3 = require("sqlite3").verbose();
/* Skapar ny koppling till databas-fil som skapades tidigare. */
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
