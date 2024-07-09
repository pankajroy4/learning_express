const express = require("express");
const app = express();

app.use(express.static("public"))

app.get("/", (req, resp)=>{
  resp.sendFile(__dirname + "/public/home.html")
})

const server = app.listen(3000, ()=>{
  console.log(
    `Server started and listening at http://localhost:${server.address().port}`
  )
})