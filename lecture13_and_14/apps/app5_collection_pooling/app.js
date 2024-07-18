const express = require("express");
const mysql = require("mysql");
const app = express();

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "pankajMySql",
  password: "Pankaj@123",
  database: "companyDB",
  debug: false
});

app.get("/employees", (req, resp) => {

  pool.getConnection((err, connection)=>{
    if(err){
      console.log("Error in connecting to DB");
      throw err;
    }
    console.log("Connected to DB successfully!");

    const sqlQuery = "select * from employee";
    connection.query(sqlQuery, (err, result) => {
      connection.release();
      if (err) {
        resp.status(500).send({ error: err.sqlMessage });
        return;
      }

      resp.send({ data: result});
      return;
    });

  })
});

const server = app.listen(3000, () => {
  console.log(
    `Server started and listening at http://localhost:${server.address().port}`
  );
});
