const express = require("express");
const path = require("path");
const app = express();

app.get("/", (req, resp) => {
  const filePath = path.join(__dirname, "public/index.html");
  resp.sendFile(filePath, (err) => {
    if (err) {
      resp.status(404).end("File not found!");
    }
  });
});

const server = app.listen(3000, () => {
  console.log(
    `Server started and listening at http://localhost:${server.address().port}`
  );
});
