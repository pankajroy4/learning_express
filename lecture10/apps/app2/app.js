const express = require("express");
const app = express();
app.set("view-engine", "ejs");
app.use(express.urlencoded({ extended: true }));

let users = [
  { name: "Radha", email: "abc@gmail.com" },
  { name: "Mohan", email: "def@gmail.com" },
];

app.use(express.static("public"));

app.get("/", (req, resp) => {
  resp.render("pages/addUser.ejs", { users: users });
});

app.post("/", (req, resp) => {
  let name = req.body.uname;
  let email = req.body.email;
  if (name && email) users.push({ name: name, email: email });

  // resp.render("pages/showUsers.ejs", { users: users });
  resp.redirect("/users");
});

app.get("/users", (req, resp) => {
  resp.render("pages/showUsers.ejs", { users: users });
});

const server = app.listen(3000, () => {
  console.log(
    `Server started and listening at http://localhost:${server.address().port}`
  );
});
