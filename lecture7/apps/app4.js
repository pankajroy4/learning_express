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
