const express = require("express");
const app = express();

const logger = (req, resp, next) => {
  console.log("A request arrived..");
  next();
};

app.use(logger);

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

/*
Note:
  Here we have used:
    app.use(logger)

    For parsing json object we used:
      app.use(express.json())

    Why we are using () parenthesis with express.json()?
      Because express.json returns a function.

--------------------------------------------------

Here we have register middleware app.use(logger) before defining any route handler, ie. top of the any route handler,
  So the logger middle ware will execute on each and every request whether the request handler is present or not.
  Here for example:
    the logger middleware will execute on each request like GET, POST, PUT, DELETE, Even the handler for put and delete are not defined.
*/
