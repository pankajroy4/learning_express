/* 
How a middleware works ?
==============================
To understand the working of a middleware assume a user wants to upload an article at a blogging website.

But before uploading the article the site wants :
  1. To check whether the user is logged in or not .
  2. His account is validated or not.
  3. He is admin or not .

All the above task will be done by 3 middleware functions as follows , after receiving the request:
  1. The first middleware function will check whether user is logged in or not. If not then it will terminate the request-response cycle by generating an error message . 
  Otherwise it will call next() to transfer the control to next middleware function .

  2.The second middleware function will check whether user’s account is validated or not . If not then it will terminate the request-response cycle by generating an error message . 
  Otherwise it will call next() to transfer the control to next middleware function .

  3.The third middleware function will check whether user is admin or not. If not then it will terminate the request-response cycle by generating an error message . 
  Otherwise it will call next() to transfer the control to actual request handler function

What is next() ?
================
A middleware function typically receives three arguments: req , res and next. 
next is the next function which will be executed after the current one.

Special point:
==============
If the current middleware function does not end the request-response cycle by sending response, it must call next() to pass control to the next middleware function. 
Otherwise, the request will be left hanging .

Creating & using middleware:
=================================
Creating and using a middleware is a 2 step process:
  1: Develop a function with 3 arguments : req, resp and next .
  2: Inform Express to load it as a Middleware .

Step-1:Creating middleware:
==============================
we will create a logger function that simply displays a message on console as soon as a request arrives .

  const logger =  (req, resp, next) =>{
      console.log("A request arrived..");
      next();
    }

Step-2: using middleware:
==============================
To make Express load our middleware function we need to call the method use() passing it our function name as argument.
Syntax:
    app.use(name_of_middleware_fn);
  Example:
    app.use(logger);

Final example:
    const express = require("express");
    const app = express();
    const logger =  (req, resp, next) =>{
      console.log("A request arrived..");
      next();
    }
    
    app.use(logger);

    app.get("/", (req, resp)=>{
        resp.send("You sent a GET request...")
      })

    app.post("/", (req, resp)=>{
        resp.send("You sent a POST request...")
      })
    const server = app.listen(3000, () => {
      console.log(`Server started and listening at http://localhost:${server.address().port}`);
    });


    Here we have register middleware app.use(logger) before defining any route handler, ie. top of the any route handler,
    So the logger middle ware will execute on each and every request whether the request handler is present or not.
      Here for example:
      The logger middleware will execute on each request like GET, POST, PUT, DELETE, Even the handler for put and delete are not defined.

Example 2:
===========================================
const express = require("express");
const app = express();

const logger = (req, resp, next) => {
  console.log("A request arrived..");
  next();
};


app.get("/", (req, resp) => {
  resp.send("You sent a GET request...");
});

app.use(logger);

app.post("/", (req, resp) => {
  resp.send("You sent a POST request...");
});

const server = app.listen(3000, () => {
  console.log(
    `Server started and listening at http://localhost:${server.address().port}`
  );
});

Here we have register middleware app.use(logger) after defining route handler for GET request, So
  The logger middleware will execute on POST, PUT, DELETE request except the GET request.

Important point:
===================
So, the order and position of registration of middleware matters a lot.

We can register middleware for the particular HTTP request, as well as for a particular route i.e URL also.

Here , in above example, we have register the middleware for each HTTP request and for each URL i.e route

Running multiple middlewares:
==================================
We can execute more than one middleware function, one after the other, on incoming request.
To do this we need to take 3 steps:
  1. Define all the middleware functions
  2. Call next() in them to pass the control to the next middleware function
  3. Pass all the middleware functions as argument to the app.use() method

Example:
----------
  const express = require("express");
  const app = express();

  const logger1 = (req, resp, next) => {
    console.log("Logger1 executed..");
    next();
  };

  const logger2 = (req, resp, next) => {
    console.log("Logger2 executed..");
    next();
  };

  app.use(logger1, logger2); //First logger1 and the logger2 will executed

  app.get("/", (req, resp) => {
    resp.send("You sent a GET request...");
  });

  app.post("/", (req, resp) => {
    resp.send("You sent a POST request...");
  });

  const server = app.listen(3000, () => {
    console.log(
      `Server started and listening at http://localhost:${server.address().port}`
    );
  });
  
*/
