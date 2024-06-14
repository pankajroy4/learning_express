/* 
Handling post request in express:
=================================
  The POST request is handled in Express using the post() method.
  This is used when there is a requirement of fetching data from HTML FORMS. 
  The data sent through the POST request is sent through the HTTP request body and stored in the request object

  For testing a POST request we require a REST API CLIENT like:
    Postman
    HoppScotch
    ReqBin
    ThunderClient extension for VS CODE

  Example:
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

Extracting post data:
=======================
  HTTP POST requests are different from GET requests because they contain data in the HTTP request body. In 99% cases it will be json data.

  Express doesn't parse HTTP request bodies by default, but it does have a built-in middleware that populates the req.body object with the parsed HTTP request body. 


*/