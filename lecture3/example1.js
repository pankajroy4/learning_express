/* 
Defining routing methods:
=========================
  We define routing methods in Express using following syntax:
      app.METHOD(PATH,CALLBACK)

    This code tells the server, “If a user generates an HTTPMETHOD request and navigates to PATH, then perform the following CALLBACK function .”

    Actually, routing methods accepts three arguments.
      1.path i.e route as string
      2.callback
      3.middleware (We will learn later)

    examples:
      app.get("/authors/", (req, resp)=>{
        
      })

  As expected the most commonly used names in place of METHOD are:
    get(): To handle GET requests 
    post(): To handle POST requests 
    put(): To handle PUT requests 
    delete(): To handle DELETE requests 

  Example:
      const express = require("express")
      const app = express();

      app.get("/", (req, resp)=>{
        resp.send("Hello from home route")  
      })

      app.get("/contact", (req, resp)=>{
          resp.send("Hello from contact route");  
      })

      app.get("/about", (req, resp)=>{
            resp.send("Hello from about route");  
      })

      const server = app.listen(3000, ()=>{
        console.log(`Server started and listening at http://localhost:${server.address().port}`)
      })
  
  What if we access a route which is not present ?
  -------------------------------------------------------
  In that case express will automatically  return a status code of 404 with a message Cannot Get <route>

Serving HTML File:
=================================================
  We can send files directly from Express as a response.
  These files can be of any type such as HTML, PDF, Multimedia, etc as a response to a client.
  This can be done using a method called sendFile() belonging to response object.
      Syntax:
        resp.sendFile(filePath, [options], [callback])

          filePath: It can be an absolute path to the file or a relative path to the correct working directory, which we want to send.

          options: options can be an optional argument containing various properties like root, etc,

          callback: It is a function that would be called when the method has finished its execution. It accepts a single argument representing error

    Example:
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

*/

