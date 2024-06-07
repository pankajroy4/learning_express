const express = require("express") 
const app = express();

app.get("/", (req, resp)=>{
  resp.send("<h1>Hello from express</h1>");
})

const server = app.listen(3000, ()=>{
  console.log(`Server is running at port ${server.address().port}`)
})