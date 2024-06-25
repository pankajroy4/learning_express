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

  NOTE:
  =====
    Express doesn't parse HTTP request bodies by default, but it does have a built-in middleware that populates the req.body object with the parsed HTTP request body. 

  As, In 99% cases, post request will have json data. If we want that this data available to us as a Javascript object, then we should use a technique called middleware.

  For this, express provides us a built-in middleware called as:

    app.use(express.json())

    More simplified:
      const json_function =  express.json()
      app.use(json_function)

    Here "json_function" is the middleware, which is a function returned by express.json()

  Middleware are the functions which executes in between the request response cycle, means after the request arrived and before the response sent.

  Example:
    app.use(express.json()) 

    The above code informs Express to automatically parse the JSON request bodies to javascript object and populates req.body object with this parsed js object for us.

    So we can access the POST request data by req.body

  Example:
      const express = require("express")
      const app = express();

      app.use(express.json())

      app.post("/api/products", (req, resp)=>{
        const product = req.body
        console.log(`Product name: ${product.name}`)
        console.log(`Product quantity: ${product.quantity}`)
        console.log(`Product price: ${product.price}`)

        resp.send({ message: "Product received!" })
      })

      const server = app.listen(4000, ()=>{
        console.log(
          `Server started and listening at http://localhost:${server.address().port}`
        );
      })
*/