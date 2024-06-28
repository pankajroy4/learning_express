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

app.post("/api/products", (req, resp)=>{
  const product = req.body
  const { error } = schema.validate(product);

  if(error){
    resp.status(400).send({ message: error.details[0].message })
    return;
  }
  const ID = 100 + products.length + 1; 
  const newProduct = { id: ID, ...product };
  products.push(newProduct)
  resp.status(201).send({ message: "Product received!", id: ID })
})

app.put("/api/products/:id", (req, resp)=>{
  const ID = Number(req.params.id)
  
  let productToUpdate = products.find(item => item.id === ID);
  if(!productToUpdate){
    resp.status(404).send({ message: "Product not found!" })
    return;
  }
  
  const product = req.body
  const { error } = schema.validate(product); 

  if(error){
    resp.status(400).send({ message: error.details[0].message })
    return;
  }
  
  productToUpdate.name = product.name
  productToUpdate.price = product.price

  resp.status(201).send({ message: "Product updated successfully!", product: productToUpdate })
})

app.delete("/api/products/:id", (req, resp)=>{
  const ID = Number(req.params.id)
  const productIndex = products.findIndex(product => product.id === ID);

  if (productIndex !== -1) {
    const deletedProduct = products[productIndex];
    products.splice(productIndex, 1);

    resp.status(200).send({ 
      message: `Product with id ${ID} deleted successfully.`,
      deletedProduct: deletedProduct 
    });

    return;
  }

  resp.status(404).send({ message: `Product with id ${ID} not found.` });
})

const server = app.listen(3000, ()=>{
  console.log(`Server started and listening on http://localhost:${server.address().port}`)
})
