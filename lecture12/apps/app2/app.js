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

app.get("/employees/:id", (req, resp) => {
  const id = Number(req.params.id)
  const sqlQuery = `select * from employee where id = ${id}`;
  connection.query(sqlQuery, (err, result) => {
    if (err) {
      resp.status(500).send({error: err.sqlMessage });
      return;
    }
    else if(result.length === 0){
      resp.status(404).send({ message: `No record for emp ${id} found!` });
      return;
    }
    resp.send(result[0]);
    return;
  });
});

const server = app.listen(3000, () => {
  console.log(
    `Server started and listening at http://localhost:${server.address().port}`
  );
});

/*
At first sight eveything looks good.
But it can suffer from a very popular attack called SQL Injection as it has the query to fetch data:
    const sqlQuery = `select * from employee where id = ${id}`;

  Suppose, we have id column as string in databse.
  So a malicious user may send id as "101 OR 10 = 10"

  As we have quired above, even if employee with 101 not found, it will send all records from table because 10 = 10  always gives true.

An SQL injection attack happens when a user injects malicious bits of SQL into our database queries.  
*/
