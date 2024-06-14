const express = require('express')

const app = express();

app.post("/login", (req, resp)=>{
  resp.send("You logged in...")
})

app.post("/logout", (req, resp)=>{
  resp.send("You logged out...")
})

const server = app.listen(3000, ()=>{
  console.log(
    `Server started and listening at http://localhost:${server.address().port}`
  );
})