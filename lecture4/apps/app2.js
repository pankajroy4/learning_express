const express = require("express")
const app = express();

app.use(express.json())

app.post("/api/products", (req, resp)=>{
  const product = req.body
  console.log(`Product name: ${product.name}`)
  console.log(`Product quantity: ${product.quantity}`)
  console.log(`Product price: ${product.price}`)

  resp.send({ message: "Product received!" })
})

const server = app.listen(4000, ()=>{
  console.log(
    `Server started and listening at http://localhost:${server.address().port}`
  );
})