const express = require("express");
const products = require("./product.js");

const app = express();

// respond to: http://localhost:3000/api/products
app.get("/api/products", (req, resp) => {
  resp.send(products);
});

// respond to: http://localhost:3000/api/products/list
app.get("/api/products/list", (req, resp) => {
  const productsList = products.map((product) => {
    return { id: product.id, name: product.name };
  });
  resp.send(productsList);
});

// respond to: http://localhost:3000/api/products/102
app.get("/api/products/:productId", (req, resp) => {
  let id = Number(req.params.productId);
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


// find() is javaScript's array method just like map(), and filter(). It accepts a callback and iterate over the array elements passing it to callback. Once the callback return true it stop iterating and return that element for which callback returns true. If callback never return true then find() returns undefined.