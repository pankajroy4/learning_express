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

/*
Here we have register middleware app.use(logger) after defining route handler for GET request, So
  The logger middleware will execute on POST, PUT, DELETE request except the GET request.
*/
