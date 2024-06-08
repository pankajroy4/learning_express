const express = require("express")
const app = express();

app.get("/", (req, resp)=>{
  resp.send("Hello from home route")  
})

app.get("/contact", (req, resp)=>{
    resp.send("Hello from contact route");  
})

app.get("/about", (req, resp)=>{
      resp.send("Hello from about route");  
})

const server = app.listen(3000, ()=>{
  console.log(`Server started and listening at http://localhost:${server.address().port}`)
})