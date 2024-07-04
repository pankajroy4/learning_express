const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  const firstNum = Number(req.body.fno);
  const secondNum = Number(req.body.sno);

  if (isNaN(firstNum) || isNaN(secondNum)) {
    return res.send("Invalid input. Please enter valid numbers.");
  }

  const sum = firstNum + secondNum;
  res.send(`Numbers are <b>${firstNum}</b> and <b>${secondNum}</b> <br/> Their sum is <b>${sum}</b>`);
});

const server = app.listen(3000, () => {
  console.log(`Server started and listening at http://localhost:${server.address().port}`);
});
