const express = require("express");
const app = express();
const pool = require("./db.js")

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
