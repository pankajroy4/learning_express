const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/conversion", (req, res) => {
  res.sendFile(__dirname + "/index2.html");
});

app.post("/", (req, res) => {
  const firstNum = Number(req.body.fno);
  const secondNum = Number(req.body.sno);

  if (isNaN(firstNum) || isNaN(secondNum))
    return res.send("Invalid input. Please enter valid numbers.");
  
  const sum = firstNum + secondNum;
  res.send(`Numbers are <b>${firstNum}</b> and <b>${secondNum}</b> <br/> Their sum is <b>${sum}</b>`);
});

app.post("/conversion", (req, res) => {
  const amount = Number(req.body.amt)
  const currency = req.body.to

  if (isNaN(amount))
    return res.send("Invalid input. Please enter valid amount.");

  switch(currency){
    case "d":
      res.send(`<h1>After Conversion</h1> ₹<b>${amount}</b> equals to $<b>${(amount/82.06).toFixed(2)}</b>`)
      break;
    case "p":
      res.send(`<h1>After Conversion</h1> ₹<b>${amount}</b> equals to £<b>${(amount/104.89).toFixed(2)}</b>`)
      break;
    case "e":
      res.send(`<h1>After Conversion</h1> ₹<b>${amount}</b> equals to €<b>${(amount/89.55).toFixed(2)}</b>`)
      break;
    default:
      res.send("Unknown currency!")
      break;
  }
});

const server = app.listen(3000, () => {
  console.log(`Server started and listening at http://localhost:${server.address().port}`);
});
