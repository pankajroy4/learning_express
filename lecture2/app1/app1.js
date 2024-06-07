const express = require("express") //returns a function

const app = express(); //return server object.

app.get("/", (req, resp)=>{
  resp.send("Hello from express");
})

const server = app.listen(3000, ()=>{
  console.log(`Server is running at port ${server.address().port}`)
})