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

app.delete("/employees/:id", (req, resp) => {
  let id = Number(req.params.id);

  const sqlQuery = "delete from employee where id = ?";
  connection.query(sqlQuery, [id], (err, result) => {
    if (err) {
      resp.status(500).send({ error: err.sqlMessage });
      return;
    } else if (result.affectedRows > 1) {
      resp.status(400).send({
        message: `Record of id ${id} not found!`,
      });
      return;
    }

    resp.send({ message: "Employee Deleted!", id: id });
    return;
  });
});

const server = app.listen(3000, () => {
  console.log(
    `Server started and listening at http://localhost:${server.address().port}`
  );
});
