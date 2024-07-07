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

app.use(logger1);
app.use("/products", logger2);

app.get("/", (req, resp) => {
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
NOTE:
Here logger1 will execute on each route whether GET or POST or DELETE or PUT
but logger2 will execute only when route is for “/products” whether GET or POST or DELETE or PUT
*/