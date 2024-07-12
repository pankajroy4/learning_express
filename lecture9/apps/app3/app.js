const express = require("express");
const app = express();
app.set("view-engine", "ejs")

app.get("/", (req, resp)=>{
  resp.render("pages/index.ejs")
})

const server = app.listen(3000, () => {
  console.log(
    `Server started and listening at http://localhost:${server.address().port}`
  );
});