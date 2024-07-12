const express = require("express");
const app = express();
app.set("view-engine", "ejs")

app.use(express.static("public"))

app.get("/", (req, resp)=>{
  resp.render("pages/home.ejs")
})

app.get("/about", (req, resp)=>{
  resp.render("pages/about.ejs")
})

app.get("/contact", (req, resp)=>{
  resp.render("pages/contact.ejs");
})

const server = app.listen(3000, () => {
  console.log(
    `Server started and listening at http://localhost:${server.address().port}`
  );
});