const express = require("express");
const app = express();
app.set("view-engine", "ejs")

let persons = [
  {name: "Sachin", city: "Bhopal", phone: 9155368245},
  {name: "Mohan", city: "Indore", phone:  8652437852},
  {name: "Pankaj", city: "Patna", phone: 7536124586},
]

app.get("/", (req, resp)=>{
  resp.render("pages/index.ejs", {persons: persons})
})

const server = app.listen(3000, () => {
  console.log(
    `Server started and listening at http://localhost:${server.address().port}`
  );
});