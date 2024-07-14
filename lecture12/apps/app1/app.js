const express = require("express");
const mysql = require("mysql");
const app = express();
app.use(express.json());
app.use(express.static("public"))
app.set("view engine","ejs")

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
      resp.render("pages/result.ejs",{status: false, error: err.sqlMessage });
      return;
    }
    resp.render("pages/result.ejs", { status: true, total: result.length, data: result });
    return;
  });
});

const server = app.listen(3000, () => {
  console.log(
    `Server started and listening at http://localhost:${server.address().port}`
  );
});
