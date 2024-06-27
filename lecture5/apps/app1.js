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
  const { error } = schema.validate(product); //destructuring of result object

  if(error){
    resp.status(400).send({ message: error.details[0].message })
    return;
  }
  const ID = 100 + products.length + 1; 
  const newProduct = { id: ID, ...product };
  products.push(newProduct)
  resp.status(201).send({ message: "Product received!", id: ID })
})

const server = app.listen(3000, ()=>{
  console.log(`Server started and listening on http://localhost:${server.address().port}`)
})

/*
Note:
  Joi stops validation on the first error it encounters by default. To include all validation errors, we need to use the abortEarly option and set it to false
    const { error } = schema.validate(product, { abortEarly: false });

  And then map through the details array to send all error messages:

    if(error){
      const errorMessages = error.details.map(detail => detail.message);
      resp.status(400).send({ messages: errorMessages });
      return;
    }
*/