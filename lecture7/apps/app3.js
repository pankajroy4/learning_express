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
