const express = require("express");
const app = express();

const logger = (req, resp, next) => {
  console.log("Logger executed..");
  next();
};

app.get("/", logger, (req, resp) => {
  resp.send("You sent a GET request at /...");
});

app.post("/", (req, resp) => {
  resp.send("You sent a POST request at /...");
});

app.get("/products", (req, resp) => {
  resp.send("You sent a GET request  at /products...");
});

app.post("/products", (req, resp) => {
  resp.send("You sent a POST request  at /products...");
});

const server = app.listen(3000, () => {
  console.log(
    `Server started and listening at http://localhost:${server.address().port}`
  );
});

/*
Here the middleware logger will execute only when request is GET and at url /.

*/