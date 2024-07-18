const mysql = require("mysql");
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "pankajMySql",
  password: "Pankaj@123",
  database: "companyDB",
  debug: false,
  queueLimit: 23,
  acquireTimeout: 1000
});

module.exports = pool;