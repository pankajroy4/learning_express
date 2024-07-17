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

app.post("/employees", (req, resp) => {
  const id = Number(req.body.id);
  const name = req.body.name;
  const salary = Number(req.body.salary);

  const sqlQuery = "insert into employee values(?, ?,?)";
  connection.query(sqlQuery, [name, id, salary], (err, result) => {
    if (err) {
      resp.status(500).send({ error: err.sqlMessage });
      return;
    } else if (result.affectedRows > 1) {
      resp.status(404).send({
        message: `Can not insert record!`,
      });
      return;
    }

    resp.send({ message: "Employee added!", id: req.body.id });
    return;
  });
});

const server = app.listen(3000, () => {
  console.log(
    `Server started and listening at http://localhost:${server.address().port}`
  );
});