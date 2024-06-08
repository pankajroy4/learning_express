const express = require("express");
const products = require("./product.js");

const app = express();

// respond to: http://localhost:3000/api/products/?productId=102
app.get("/api/products/", (req, resp) => {
  let id = Number(req.query.productId);
  const product = products.find((product) => {
    return product.id === id;
  });

  if (!product) {
    resp.status(404).send({ error: "Product not found" });
    return;
  }
  resp.send(product);
});

const server = app.listen(3000, () => {
  console.log(
    `Server started and listening at http://localhost:${server.address().port}`
  );
});

