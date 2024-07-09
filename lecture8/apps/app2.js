const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");

const app = express();
const logger = morgan(
  "A new :method request arrived at :url and response was :status"
);

app.use(helmet());
app.use(logger);

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
