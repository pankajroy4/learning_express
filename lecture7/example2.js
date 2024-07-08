/* 
Accessing request object in middleware:
=========================================
As mentioned previously every middleware has access to the request and response objects.
So it can use the request object properties to gain some more information about the incoming request .

Example:
===========
  const express = require("express");
  const app = express();

  const logger = (req, resp, next) => {
    console.log(`A ${req.method} arrived at ${req.originalUrl}`);
    next();
  };

  app.use(logger);

  app.get("/home", (req, resp) => {
    resp.send("You sent a GET request...");
  });

  app.post("/products", (req, resp) => {
    resp.send("You sent a POST request...");
  });

  const server = app.listen(3000, () => {
    console.log(
      `Server started and listening at http://localhost:${server.address().port}`
    );
  });

Passing data from middleware:
===============================
Express allows us to modify the request and response objects in middleware function.
For example , we can add a property in request object to pass some data to the next middleware or route handler function .

Example:
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

======================================================
Run middleware for a specific route i.e URL:
=====================================================
We can execute an Express middleware only for a specific route.
To do this we pass a route argument before the middleware function to the app.use() method.

  Syntax:
    app.use(“route i.e URL”, name_of_middleware_fn);

  Example:
    const express = require("express");
    const app = express();

    const logger1 = (req, resp, next) => {
      console.log("Logger1 executed..");
      next();
    };

    const logger2 = (req, resp, next) => {
      console.log("Logger2 executed..");
      next();
    };

    app.use(logger1);
    app.use("/products", logger2);

    app.get("/", (req, resp) => {
      resp.send("You sent a GET request at /...");
    });

    app.post("/", (req, resp) => {
      resp.send("You sent a POST request at /...");
    });

    app.get("/products", (req, resp) => {
      resp.send("You sent a GET request  at /products...");
    });

    app.post("/products", (req, resp) => {
      resp.send("You sent a POST request  at /products...");
    });

    const server = app.listen(3000, () => {
      console.log(
        `Server started and listening at http://localhost:${server.address().port}`
      );
    });

  NOTE:
    Here logger1 will execute on each route whether GET or POST or DELETE or PUT
    but logger2 will execute only when route is for “/products” whether GET or POST or DELETE or PUT

==============================================================
Run middleware for a specific http method to a specific route:
==============================================================
When we pass the middleware function to app.use() method then it runs for EVERY HTTP METHOD .

However we can execute an Express middleware only for a specific HTTP method with specific route also.

Till now, we register the middleware with app.use() .
If we want to execute a middleware to a specific HTTP method with specific route, then we register the middleware with the specific HTTP method:

So:
  To do this we pass the middleware function to that method’s route handler instead of use() method
    Syntax:
      app.<http_method>(“route_i.e_url”, middleware_fun1, middleware_fun2..,callback_i.e_route_handler);

  Example:
    const express = require("express");
    const app = express();

    const logger = (req, resp, next) => {
      console.log("Logger executed..");
      next();
    };

    //Here We register with HTTP method:
    app.get("/", logger, (req, resp) => {
      resp.send("You sent a GET request at /...");
    });

    app.post("/", (req, resp) => {
      resp.send("You sent a POST request at /...");
    });

    app.get("/products", (req, resp) => {
      resp.send("You sent a GET request  at /products...");
    });

    app.post("/products", (req, resp) => {
      resp.send("You sent a POST request  at /products...");
    });

    const server = app.listen(3000, () => {
      console.log(
        `Server started and listening at http://localhost:${server.address().port}`
      );
    });

  Here the middleware logger will execute only when request is GET and at url /.

Example:
    const express = require("express");
    const app = express();
    const products = require("./products.js");

    app.use(express.json());

    const checkForJson = (req, resp, next) => {
      console.log("Middleware executed..")
      if (req.headers["content-type"] !== "application/json") {
        resp.status(400).send({ message: "Server requires JSON object for POST" });
        return;
      }
      next();
    };

    app.get("/api/products", (req, resp) => {
        console.log("GET route executed....");
        resp.send(products);
    });

    app.post("/api/products", checkForJson, (req, resp) => {
      console.log("POST route executed....")
      const ID = 100 + products.length + 1;
      const newProduct = { id: ID, ...req.body };

      products.push(newProduct);

      resp.send({ message: "Product received!", id: ID });
    });

    const server = app.listen(3000, () => {
      console.log(
        `Server started and listening at http://localhost:${server.address().port}`
      );
    });

*/ 