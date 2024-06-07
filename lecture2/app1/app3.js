const express = require("express") 
const app = express();

app.get("/", (req, resp)=>{
  let person = {name: "Mohan", age: 25}
  resp.send(person);
})

const server = app.listen(3000, ()=>{
  console.log(`Server is running at port ${server.address().port}`)
})