const express = require("express");
const app = express();

const logger = (req, resp, next) => {
  let now = new Date();
  let timestamp =  `${now.toDateString()} at ${now.toLocaleTimeString()}`
  req.times = timestamp;
  next();
};

app.use(logger);

app.get("/home", (req, resp) => {
  resp.send({requestType: req.method, timestamp: req.times});
});

app.post("/products", (req, resp) => {
  resp.send({requestType: req.method, timestamp: req.times});
});

const server = app.listen(3000, () => {
  console.log(
    `Server started and listening at http://localhost:${server.address().port}`
  );
});
