const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

let todos = [
  { id: 101, task: "Visit Mall" },
  { id: 102, task: "Buy coeffee" },
];

app.get("/", (req, resp) => {
  resp.render("pages/todo.ejs", { records: todos });
});

app.post("/", (req, resp) => {
  const maxId = todos.reduce((max, todo) => (todo.id > max ? todo.id : max), 100);
  const id = maxId + 1;
  const task = req.body.todo;

  if(task){
    todos.push({ id: id, task: task });
  }
  resp.redirect("/");
});


/* 
Here we are using post request to delete , we can also use something called "method-override" package by npm. We can also use AJAX
*/

app.post("/delete", (req, resp) => {
  const id = Number(req.body.id);
  const index = todos.findIndex((todo) => todo.id === id);

  if (index !== -1) {
    todos.splice(index, 1);
    // resp.redirect("/");  //we can also redirect instead of rendering.
    resp.render("pages/todo.ejs", { records: todos });
  } else {
    resp.render("pages/error.ejs");
  }
});

const server = app.listen(3000, () => {
  console.log(
    `Server started and listening at http://localhost:${server.address().port}`
  );
});
