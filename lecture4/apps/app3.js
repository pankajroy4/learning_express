const express = require("express")
const app = express();
const products = require("./products.js")

app.use(express.json())

app.post("/api/products", (req, resp)=>{
  const ID =  products.at(-1).id + 1
  const newProduct = { id: ID, ...req.body };

  products.push(newProduct)

  resp.send({ message: "Product received!", id: ID })
})

const server = app.listen(4000, ()=>{
  console.log(
    `Server started and listening at http://localhost:${server.address().port}`
  );
})