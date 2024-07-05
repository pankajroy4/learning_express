/* 
Accessing request object in middleware:
=========================================
As mentioned previously every middleware has access to the request and response objects.
So it can use the request object properties to gain some more information about the incoming request .

Example:
===========
  const express = require("express");
  const app = express();

  const logger = (req, resp, next) => {
    console.log(`A ${req.method} arrived at ${req.originalUrl}`);
    next();
  };

  app.use(logger);

  app.get("/home", (req, resp) => {
    resp.send("You sent a GET request...");
  });

  app.post("/products", (req, resp) => {
    resp.send("You sent a POST request...");
  });

  const server = app.listen(3000, () => {
    console.log(
      `Server started and listening at http://localhost:${server.address().port}`
    );
  });

Passing data from middleware:
===============================
Express allows us to modify the request and response objects in middleware function.
For example , we can add a property in request object to pass some data to the next middleware or route handler function .

Example:
  const express = require("express");
const app = express();

const logger = (req, resp, next) => {
  let now = new Date();
  let timestamp =  `${now.toDateString()} at ${now.toLocaleTimeString()}`
  req.times = timestamp;
  next();
};

app.use(logger);

app.get("/home", (req, resp) => {
  resp.send({requestType: req.method, timestamp: req.times});
});

app.post("/products", (req, resp) => {
  resp.send({requestType: req.method, timestamp: req.times});
});

const server = app.listen(3000, () => {
  console.log(
    `Server started and listening at http://localhost:${server.address().port}`
  );
});


Time: 36 minutes.

*/ 