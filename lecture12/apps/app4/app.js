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
  const minRange = Number(req.query.min) 
  const maxRange = Number(req.query.max) 
  const sqlQuery = "select * from employee where salary between ? and ?";
  connection.query(sqlQuery, [minRange, maxRange], (err, result) => {
    if (err) {
      resp.status(500).send({ error: err.sqlMessage });
      return;
    } else if (result.length === 0) {
      resp.status(404).send({ message: `No record for salary range ${minRange} to ${maxRange} found!` });
      return;
    }
    resp.send(result);
    return;
  });
});

const server = app.listen(3000, () => {
  console.log(
    `Server started and listening at http://localhost:${server.address().port}`
  );
});
