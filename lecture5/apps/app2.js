const express = require("express")
const Joi = require("joi")
const products = require("./products")

const app = express();
app.use(express.json())

const schema = Joi.object({
  name: Joi.string().min(3).required(),
  price: Joi.number().integer().min(5000).required()
})

app.get("/api/products", (req, resp)=>{
  resp.send(products);
})

app.put("/api/products/:id", (req, resp)=>{
  const ID = Number(req.params.id)
  
  let updateProduct = products.find(item => item.id === ID);
  if(!updateProduct){
    resp.status(404).send({ message: "Product not found!" })
    return;
  }
  
  const product = req.body
  const { error } = schema.validate(product); 

  if(error){
    resp.status(400).send({ message: error.details[0].message })
    return;
  }
  
  updateProduct.name = product.name
  updateProduct.price = product.price

  resp.status(201).send({ message: "Product updated successfully!", product: updateProduct })
})

const server = app.listen(3000, ()=>{
  console.log(`Server started and listening on http://localhost:${server.address().port}`)
})
