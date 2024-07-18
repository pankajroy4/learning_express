/* 
How connections are opened ?
========================================
Database connections are costly since they are heavy to create and maintain by the database server. 

Whenever we connect to a database , then irrespective of our tech stack , following steps takes place:

  1. Application opens a connection using the database driver/package.
  2. Network socket is opened to connect the application and the database.
  3. User authentication will take place using the credentials provided in the connection details.
  4. Application then, would be able to perform the required db operations.
  5. Once the operation completes, the connection is closed by the application.
  6. The network socket gets closed.

Ways to connect to database:
=============================================
There are two ways to establish a connection with a database: 
  1. Single Connection and 
  2. Connection Pool.

Single connection:
========================================
  Single database connection means that we are using only one shared connection to execute all the queries triggered by all our application users. 

  So, we use single connection only when the number of an application users at the same time is limited and their queries are simple.

  With this type of connection, when a user makes a query, the application creates a connection and sends the user query to the database for execution. 

  After that, the application gets the results and displays the data to the user and closes the connection which means to be disconnected with the database. 

  problem with single connection:
  --------------------------------
    The problem with this approach is that the application will create a new connection for the next new query. 

    This process of closing and creating connection may slow down our application and reduce its performance.

  Till now, we were using single connection.

What is connection poling ?
=================================
  Connection pooling is a technique used in database management systems to manage a pool of database connections .

  These connections can be reused for multiple requests instead of creating a new connection for each request. 

  This helps to reduce the overhead associated with establishing a new connection, which can be time-consuming and resource-intensive.

How connection pooling works ?
================================================
  Connection pooling works as follows:

    1.When a client requests a connection to the database, the connection pool checks if there are any available connections in the pool. 
    2. If there is an available connection, it’s returned to the client. 
    3. If there are no available connections, the pool creates a new connection and returns it to the client. 
    3. Once the client is done with the connection, it’s returned back to the pool for reuse.

Steps needed for connection pooling:
=================================================
Steps needed for Connection pooling are as follows:

  1. Import the mysql package

  2. Call the createPool() method of mysql object instead of createConnection(), passing it an object with same key-value pairs as createConnection() method , but with one extra argument called connectionLimit which holds the number of connections to be opened initially in the pool.

  Looks like:
      const pool = mysql.createPool({
          connectionLimit: 7,
          host: 'localhost',
          user: 'root',
          password: ‘root123', 
          database: ‘companydb'
      })

  3.Now, to establish a connection from the connection pool, we have to call the getConnection() method of the pool object as follows:

      pool.getConnection(function(err, connection) {
        // execute query
        // ...
      });

  4.Finally, to revert a connection back to the pool once we’re done with it we can invoke the connection.release() method so that this connection can be availed in the pool by someone else. 

      pool.getConnection(function(err, connection) {
        // execute query using connection object recevied in callback args same as previous.
        // ...
        connnection.release();
      });

Difference betweeen createConnection() and createPool():
=========================================================
1. createConnection():
  => Establishes a single connection to the MySQL database.
  => The connection is kept open until:
                unexpected disconnection,
                mysql timeout,  
                explicitly using the end() method.
  => This method is suitable for applications that require very less database interactions or have very few users

2. createPool():
  => Creates a pool of database connections, which can be used and reused as needed.
  => Connections from the pool are acquired and released automatically by the mysql module.
  => This method is suitable for applications that require a large number of database interactions, such as high-traffic web applications.

How to decide pool size?
====================================
  Unfortunately, there’s no easy answer to this question.
  To determine the optimal size for a connection pool, we’ll need to factor in a lot of specific-to-our application and implementation details.

  However some tests performed show that pool size is related to CPU cores and the general formula is:

      Connections = number of CPU cores in your cluster * 4

  Most workloads perform best when the maximum number of connections is between 2x and 4x the number of CPU cores

  Also , in general holding a connection is not expensive for a database while creating a new one is quite expensive.
  So it should be no problem to keep the size high enough.

  Considering peak hours we can set the connection size according to the number of parallel users we are expecting.


What happens if pool is full?
====================================
Q. The request may wait in a queue for a free connection, or not?
    Ans:
    This is based on the option waitForConnections. 

    If we set this option to false, the request returns an error immediately instead of waiting.

  If more than queueLimit requests are already waiting, the new request returns an error immediately. 

  The default value is 0, which means there is no limit to the queue.

  The request will wait for a maximum of acquireTimeout milliseconds, then if it still didn't get a free connection, returns an error.

  Its default value is 1000.

*/