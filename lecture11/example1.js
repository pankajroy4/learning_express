/* 
Connecting node to mysql:
============================
In order to connect a Node application to MySQL we need to follow below mentioned steps:

  1.Install the mysql driver by: npm install mysql 
                          or by: npm install mysql2
  2.Import mysql in the code to get back an object as:
                                const mysql = require("mysql")
                        or as:  const mysql2 = require("mysql2")

  3. Configure and create a connection object by calling the method createConnection() passing it the required configurations as object on the mysql/mysql2 object as:

                        const connection = mysql.createConnection({ host: "host_name",
                          user: "user_name of mysql",
                          password: "password for the mysql user",
                          database: "database_name",
                        })

  3.Establish/open the connection to MySQL database by calling the method connect() on connection object as:
  4.Execute the SQL query and handle the response.

Step 0-Installing mysql package:
===================================
  The first step in connecting to MySQL is to install an npm package called mysql .
        npm install mysql
    or  npm install mysql2

      mysql package work asynchronously, i.e we have to use callbacks.

      mysql package also works asynchronouly but it is promise based, i.e it will returns promises.

  This package provides all the necessary methods and objects which are required to access MySQL from a Node application.

Step 1- import mysql
======================
  The next step is to load the mysql package using the require() function.

          const mysql = require("mysql")
      or  const mysql2 =  require("mysql2")

  The above call will return an object which provides methods to interact with MySQL database.

Step 3- Get a connection object.
=================================
  A connection object can be created through the createConnection() method of the mysql instance. 

  This object can then be used to create a connection between the server and the client.

  It accepts an object with 4 key-value pairs:
    *host: The ip/computer name of the computer where MySQL server is running. The default value is 'localhost’.

    *user - The database username . The default value is 'root’.

    *password - The database password. The default value is an empty string (no password).

    *database_name– The name of the database with which we want to connect.

        const connection = mysql.createConnection({ host: "host_name",
                                                  user: "user_name of mysql",
                                                  password: "password for the mysql user",
                                                  database: "database_name",
                                                })

Step 4: opening the connection:
==================================
  Once a connection has been configured, we can establish a connection to the server.

  To do this we call the connect() method of connection object.

  The connect() method works asynchronously and uses a callback which allows us to check whether the connection was successful or not.
  Whether the connection was successful or not, the callback will be executes. If connection was successfull then callback will receive undefined in argument. If connection fails, then error object will be passed to the callback as argumnet.

    connection.create((err)=>{
        if(err){
          console.log("Connection to database denied! " + err.messaage)
          trhow err;
        }
        console.log("Connected to the Database");
      })

  *An important point!
  -------------------------------------------
    It's quite possible that when we run connection.create() method, probably, we will receive a error notice as follows:
      Error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol.

    Why this error occurred ?
    -----------------------------
    It will happen due to mismatch in authentication plugin used by MySql database and nodeJs MySql library.

      MySql database, from version  >= 8.x changes the authentication plugin and that plugin is:
          SHA256_PASSWORD
      
    But NodeJS MySql Library hasn't changed yet and it is still uses the old authentication plugin which is :
            SHA2_PASSWORD
      which was uses in previous versions of MySql Databse.
    
    Solution:
    -----------------------
    Solution 1:
      run the command:
        alter user 'root'@'localhost' identified with mysql_native_password by 'your_new_password_here';

      This command tells mysql8 to use old/native authentication algorithm for the root user.
    
    Solution2:
      Crete a new user and use old_password plugin by above command for new user.

    Solution3:
      Use "mysql2" NodeJS MySql library instead of "mysql".
      Remember, when we use "mysql2" library then we have to use promises and async await.
      
      "mysql2" libraray uses new authentication pluging SHA256_PASSWORD. 

Step 5: Execute the query
===============================
  Almost all of the actions we need to perform in a MySQL database are done through SQL queries.
  To send an SQL query to MySQL database we call the method query() of the connection object.

  It accepts a string, representing a query we would like to send to the database.
  A query may fail or return some result.

  Thus query() method accepts a callback with 2 arguments preferably called err and result based on how the operation went.

  So query() method accepts two argument. and its callback also accepts two argument.

    query(sqlQery, callback_method);

    query(sqlQery, (err, result)=>{
      })

  What does result hold ?
  -------------------------------
  The 2nd argumnet of callback of qery() method is result which will hold the response depending on the type of query we sent for execution:

  If it is a SELECT query , it holds an array of objects of type class RowDataPacket which is a low level library/class of mysql package.

  For all other queries it holds a simple JS object with some key value pairs which includes details about how the query affected the table.

  const sqlQuery = "select * from employees"
  connection.query(sqlQuery, (err, result)=>{
      if(err){
        throw err;
      }
      //process the result
    })
      
Closing the connection:
===========================
  To close a database connection, we can call the end() method on the connection object.

  The end() method ensures that all remaining queries are always executed before the database connection is closed.

    connection.end((err)=>{
        if(err){
          return console.log("error:" + err.message);
        }
        console.log("Disconnected with the DB");
      })

Another way to close connection:
======================================
  To force the connection to close immediately, we can use the destroy() method. 

    connection.destroy();

  The destroy() method guarantees that no more callbacks or events will be triggered for the connection nor it takes any callback as argument.

Time: 45 minutes
  */