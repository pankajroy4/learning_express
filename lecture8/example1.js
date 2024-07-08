/* 
THIRD PARTY MIDDLEWARE:
============================
Third party middleware functions are used to enhance the functionality of Express. 

Express uses several types of third party middleware functions like “morgan”, “helmet”, “body-parser” etc

What is morgan ?
------------------
Morgan is an HTTP request logger middleware for Node.js typically used for Express apps.
It streamlines the process by generating logs for each API request and error. 

The best fact is that we can decide the format of the log which can either be a predefined format or our own format.

Installing morgan:
-----------------------
We can install the morgan by using the following command inside our application folder:
    npm install –D morgan

What is –D ?
---------------
-D is a flag that indicates that we want to install this package as a dev-dependency .

What is a dev-dependency ?
-----------------------------
We know that the file package.json contains all the details regarding dependencies of a project and there are three types of dependencies that are found in this file. 

  They are :
    1. dependencies or regular dependencies or production dependencies
    2. dev dependencies
    3. peer dependencies

  1: Dependencies or Regular dependencies or Production dependencies:
  -------------------------------------------------------------------
    Dependencies or Regular dependencies or Production dependencies, are the packages that our project relies on to run in a production environment. 

    These dependencies are essential for the functionality of our JavaScript application and are listed in the “dependencies” section of a package.json file.

    When we install an npm package using the following command 
      npm install <package_name>
    without any flags, it gets automatically added to the regular dependencies specified in the package.json file.

  2: Dev-dependencies:
  ------------------------------------------------------------------
    Dev dependencies, short for development dependencies, are packages that are only needed during the development and testing phase of our project. 

    This means that these dependencies are not strictly required to run our application in a production environment.

    Examples of dev dependencies include testing frameworks, code linters, loggers etc. 

    Dev dependencies are listed in the “devDependencies” section of a package.json file.
    To install a dev dependency, we  need to specify it using --save-dev or -D flag in the npm install command.

  3: peer-dependencies:
  -------------------------------------------------------------------
    PeerDependencies are the packages that your package expects to be installed in the user’s environment. 

    These packages are not installed automatically when your package is installed, but the user is expected to install them manually. 

    The best example of a peer-dependency is ‘react’ which is common in every project to run similarly. 
    For example, suppose we created a React functional component called FancyButton.
    Now , if anyone uses this component then we would expect that his environment must have at least React 16.8

    PeerDependencies are specified in the peerDependencies section of the package.json file. 

    PeerDependencies are not automatically added in package.json file, rather we have to manually type it in package.json file
      example:
          "peerDependencies": {
            "react": ">= 16.18"
          },

Using morgan:
--------------------------------------
To use morgan in our Express server, we take 3 steps:

  1. Load it using require() after installing it as: npm install morgan -D
     This will return a function .
  2. Call that function passing it a format as argument .
  3. Receive the return value and pass it as argument to app.use() before our HTTP requests.  

What formats can we pass ?
------------------------------------
  morgan comes with a suite of predefined format strings, to create a new logger middleware with built-in format and options. 
  Some popular formats are:

  1: “tiny” : Returns method, url, status, res[content-length],  response-time[ms]

    Example:
        GET /api/products 200 22 - 2.621 ms

  2: “short” :Returns remote-addr i.e client ip, remote-user, method, url, http-version, status, res[content-length],  response-time[ms]

    Example: 
        ::1 - GET /api/products HTTP/1.1 200 24 - 4.298 ms

  3: “dev” :Returns method, url, http-version, status, res[content-length],  response-time[ms]
    
    Example: GET /products 200 2.891 ms - 22
        Here, status like 200, 404 will be coloured output.

  For a developer, most useful is "dev"

 Example:
    const express = require("express")
    const morgan = require("morgan")

    const app = express();
    const logger = morgan("dev")

    app.use(logger)

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


Time: 46 minutes
*/ 