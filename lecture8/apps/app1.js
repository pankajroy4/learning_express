const express = require("express")
const morgan = require("morgan")

const app = express();
const logger = morgan("dev")

app.use(logger)

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