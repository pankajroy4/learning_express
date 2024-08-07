const express = require("express");
const mysql = require("mysql");
const app = express();
app.use(express.json());

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

app.get("/employees", (req, resp) => {
  const sqlQuery = "select * from employee";
  connection.query(sqlQuery, (err, result) => {
    if (err) {
      resp.status(500).send({ error: err.sqlMessage });
      return;
    }
    resp.send({ total: result.length, data: result });
    return;
  });
});

const server = app.listen(3000, () => {
  console.log(
    `Server started and listening at http://localhost:${server.address().port}`
  );
});
