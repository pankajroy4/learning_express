const express = require("express");
const mysql = require("mysql");

const app = express();

const connection = mysql.createConnection({
  host: 'localhost',
  user: "pankajMySql",
  password: "Pankaj@123",
  database: "companyDB"
})

connection.connect((err)=>{
  if(err){
    throw err;
  }
  console.log("Connected to DB Successfully!")
})

const sqlQuery = 'select * from employee';
connection.query(sqlQuery, (err, result) => {
  if (err) {
    console.log(err.message);
    throw err;
  }

  console.log(result);
});

 connection.end((err) => {
   if (err) {
     return console.log("error:" + err.message);
   }
   console.log("Disconnected with the DB");
 });


console.log("Bye")

const server = app.listen(3000, ()=>{
  console.log(
    `Server started and listening at http://localhost:${server.address().port}`
  )
})


/* 
Output:

Bye
Server started and listening at http://localhost:3000
Connected to DB Successfully!
[
  RowDataPacket { name: 'Alice', id: 1, salary: 5000 },
  RowDataPacket { name: 'Bob', id: 2, salary: 4500.5 },
  RowDataPacket { name: 'Charlie', id: 3, salary: 5200.75 },
  RowDataPacket { name: 'David', id: 4, salary: 4800.2 },
  RowDataPacket { name: 'Eve', id: 5, salary: 4700.3 }
]
*/