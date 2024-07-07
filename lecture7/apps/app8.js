const express = require("express");
const app = express();
const products = require("./products.js");

app.use(express.json());

const checkForJson = (req, resp, next) => {
  console.log("Middleware executed..")
  if (req.headers["content-type"] !== "application/json") {
    resp.status(400).send({ message: "Server requires JSON object for POST" });
    return;
  }
  next();
};

app.get("/api/products", (req, resp) => {
    console.log("GET route executed....");
    resp.send(products);
});

app.post("/api/products", checkForJson, (req, resp) => {
  console.log("POST route executed....")
  const ID = 100 + products.length + 1;
  const newProduct = { id: ID, ...req.body };

  products.push(newProduct);

  resp.send({ message: "Product received!", id: ID });
});

const server = app.listen(3000, () => {
  console.log(
    `Server started and listening at http://localhost:${server.address().port}`
  );
});
