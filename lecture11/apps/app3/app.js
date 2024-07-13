const express = require("express");
const mysql2 = require("mysql2/promise");

const app = express();

async function connectToDB() {
  let connection; 
  try{
      connection = await mysql2.createConnection({
      host: "localhost",
      user: "pankajMySql",
      password: "Pankaj@123",
      database: "companyDB",
    });
    console.log("Connected to DB Successfully!");

    const result = await connection.query("select * from employee")
    console.log(result);

  }catch(err){
    console.log("error in connection: " + err);
  }finally{
    if(connection){
      await connection.end();
      console.log("Connection closed!")
    }
  }

}

connectToDB();
console.log("Bye"); //it will printed first.

const server = app.listen(4000, () => {
  console.log(
    `Server started and listening at http://localhost:${server.address().port}`
  );
});


/* 
Note:
  when we use mysql2, then we do not have to use connection.qery() method.
  It will automatically connected when qery is fired!
*/

/* 
Output:

Bye
Server started and listening at http://localhost:4000
Connected to DB Successfully!
[
  [
    { name: 'Alice', id: 1, salary: '5000.00' },
    { name: 'Bob', id: 2, salary: '4500.50' },
    { name: 'Charlie', id: 3, salary: '5200.75' },
    { name: 'David', id: 4, salary: '4800.20' },
    { name: 'Eve', id: 5, salary: '4700.30' }
  ],
  [
    `name` VARCHAR(20),
    `id` INT NOT NULL PRIMARY KEY,
    `salary` DECIMAL(8,2)
  ]
]
Connection closed!

*/