const express = require("express");
const mysql = require("mysql");

const app = express();

const connection = mysql.createConnection({
  host: "localhost",
  user: "pankajMySql",
  password: "Pankaj@123",
  database: "companyDB",
});

connection.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to DB Successfully!");
});

const sqlQuery = "select * from employee";
connection.query(sqlQuery, (err, result) => {
  if (err) {
    console.log(err.message);
    throw err;
  }

  console.log(`Total records: ${result.length}`);
  result.forEach((packet) => {
    let {id, name, salary} = packet  //destructuring of object
    console.log(
      `id: ${id} name: ${name} salary: ${salary}`
    );
  });
});

connection.end((err) => {
  if (err) {
    return console.log("error:" + err.message);
  }
  console.log("Disconnected with the DB");
});

console.log("Bye");

const server = app.listen(3000, () => {
  console.log(
    `Server started and listening at http://localhost:${server.address().port}`
  );
});

/* 
Output:

Bye
Server started and listening at http://localhost:3000
Connected to DB Successfully!
Total records: 5
id: 1 name: Alice salary: 5000
id: 2 name: Bob salary: 4500.5
id: 3 name: Charlie salary: 5200.75
id: 4 name: David salary: 4800.2
id: 5 name: Eve salary: 4700.3
Disconnected with the DB
*/
