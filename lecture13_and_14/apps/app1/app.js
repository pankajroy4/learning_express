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
  let {id, name, salary} = req.body;
  id = Number(id);
  salary = Number(salary);

  const sqlQuery = "insert into employee values(?, ?,?)";
  connection.query(sqlQuery, [name, id, salary], (err, result) => {
    if (err) {
      resp.status(500).send({ error: err.sqlMessage });
      return;
    } else if (result.affectedRows > 1) {
      resp.status(400).send({
        message: `Can not insert record!`,
      });
      return;
    }

    resp.send({ message: "Employee added!", id: id });
    return;
  });
});

const server = app.listen(3000, () => {
  console.log(
    `Server started and listening at http://localhost:${server.address().port}`
  );
});