/* 
Sql Injection:
===================
Consider below code:
------------------------
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


At first sight eveything looks good.
But it can suffer from a very popular attack called SQL Injection as it has the query to fetch data:
    const sqlQuery = `select * from employee where id = ${id}`;
  Suppose, we have id column as string in databse.

  So a malicious user may send id as "101 OR 10 = 10"

  As we have quired above, even if employee with 101 not found, it will send all records from table because 10 = 10  always gives true.

An SQL injection attack happens when a user injects malicious bits of SQL into our database queries. 

By injecting their own SQL, the user can cause harm by:
  reading sensitive data
  modifying sensitive data

Thus we  should never accept raw input from a user and input it directly into our query string. 
Instead, we should use placeholders (?)

What are Placeholders ?  
====================================
  A placeholder is simply ‘?’ and it goes in the SQL query in place of a yet-to-be-supplied value. 

  The program is then expected to replace that ‘?’ with a value that is supplied at run time by user or any other source.

  In simple words,  a placeholder allows us to bind parameters with values in an SQL query.

  And by using placeholders, the malicious SQL will be escaped and treated as a raw string, not as actual SQL code.

How to use placeholders ?
======================================
  To use a placeholder we take 2 steps:
    1: Apply the symbol of ? in the SQL query passed to the query() method wherever we want to add the dynamic value.

    2: Pass a second argument to the query() method which will be an array containing the value/variable to be used in place of question mark.

  At run time the placeholders will be replaced with the values passed in the array as per their order.

So above example code should be written as:

      const sqlQuery = "select * from employee where id = ?";
      connection.query(sqlQuery, [id], (err, result)=>{
          ...
          ...
        })

      OR in single step:
      ------------------
      
      connection.query("select * from employee where id = ?" , [id], (err, result)=>{
          ...
          ...
        })      

*/