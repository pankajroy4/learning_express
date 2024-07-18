/* 
Inserting record:
========================
The steps to insert a new record are same as selecting a record.
Here also if the values are dynamic then we can use placeholders.

However as a result we do not get a RowDataPacket object , rather we get a normal JS object with some key-value pairs .
Any qery other than select, all return a normal JS object.
The most useful is the affectedRows property which returns total  number of rows effected

Example:
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
          resp.status(404).send({
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

Updating record:
=================================================
The steps to update a record are same as inserting a new record.

Here also if the values are dynamic then we can use placeholders.

To obtain number of rows effected we can use the affectedRows property of the object we get back as a response from db.

Example:

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

  app.put("/employees/:id", (req, resp) => {
    let id = Number(req.params.id)
    let {name, salary} = req.body;
    salary = Number(salary);

    const sqlQuery = "update employee set name = ?, salary = ? where id = ?";
    connection.query(sqlQuery, [name, salary, id], (err, result) => {
      if (err) {
        resp.status(500).send({ error: err.sqlMessage });
        return;
      } else if (result.affectedRows > 1) {
        resp.status(400).send({
          message: `Record of id ${id} not found!`,
        });
        return;
      }

      resp.send({ message: "Employee Updated!", data: {empid: id, ename: name, salary: salary }});
      return;
    });
  });

  const server = app.listen(3000, () => {
    console.log(
      `Server started and listening at http://localhost:${server.address().port}`
    );
  });

Deleting record
===========================================
The steps to delete a record are same as updating a record.

Here also if the values are dynamic then we can use placeholders.

To obtain number of rows effected we can use the affectedRows property of the object we get back as a response from db.

Example:

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

*/