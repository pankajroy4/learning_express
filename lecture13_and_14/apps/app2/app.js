const express = require("express");
const mysql = require("mysql");
const app = express();
app.set("view-engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

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
      resp.render("pages/error.ejs", { error: err.sqlMessage });
      return;
    }
    resp.render("pages/showEmployees.ejs", { users: result });
    return;
  });
});

app.get("/", (req, resp) => {
  resp.render("pages/addEmployee.ejs");
});

app.post("/", (req, resp) => {
  let name = req.body.empName;
  let salary = Number(req.body.empSal);

  if (name && salary) {
    connection.query("select MAX(id) as maxId from employee", (err, result) => {
      if (err) {
        resp.render("pages/error.ejs", { error: err.sqlMessage });
        return;
      }

      let id =
        result.length === 0 || result[0].maxId === null
          ? 1
          : result[0].maxId + 1;

      connection.query(
        "insert into employee values(?,?,?)",
        [name, id, salary],
        (err, result) => {
          if (err) {
            resp.render("pages/error.ejs", { error: err.sqlMessage });
            return;
          } else if (result.affectedRows === 0) {
            resp.render("pages/error.ejs", {
              error: `Cannot insert record!`,
            });
            return;
          }
          resp.render("pages/success.ejs");
        }
      );
    });
  } else {
    resp.render("pages/error.ejs", {
      error: `Invalid Input!`,
    });
  }
});

const server = app.listen(3000, () => {
  console.log(
    `Server started and listening at http://localhost:${server.address().port}`
  );
});
