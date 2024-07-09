/* 
What are static files ?
================================
Static files/resource are files whose content remains same i.e it never changes.
In short they are  files of type HTML, javascript, CSS, images, and many more.

How to serve static files ?
=================================
It is very easy to serve static files in Express .
This is because Express provides a built-in middleware for this purpose and it is called express.static(). 

Using express.static() method, we can serve static resources directly by specifying the folder name where we have stored our static resources.

  Syntax:
    express.static(root, [options])

    *Explanation:
      1: root: This is the root directory name as string, from which the static assets will be served. This is a required parameter. All the static files should be placed inside this folder. When we use express.static("folder_name") middleware then all files inside this folder will be automatically served.

      2: options: This is an optional object that can be used to configure the behavior of the middleware.

  So we just have to use:
      app.use(express.static("folder_name_with full_path"))

  Example:
      See, static_demo folder.

      const express = require("express");
      const app = express();

      app.use(express.static("public"))

      app.get("/", (req, resp)=>{
        resp.sendFile(__dirname + "/public/home.html")
      })

      const server = app.listen(3000, ()=>{
        console.log(
          `Server started and listening at http://localhost:${server.address().port}`
        )
      })

    NOTE:
      By using the middleware,
        app.use(express.static("public"))
      we load the static resources that we have to served to client.
*/