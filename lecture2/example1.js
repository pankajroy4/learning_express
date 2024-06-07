/* 
Developing first express server:
=================================
To create a web server using Express we need to take 4 steps:
  1.Import the express module which will return a function.

  2.Call that function to get an object (called as server obejct) which can be used to configure our server.

  3.Using that server object call the method get() passing it 2 arguments : a route as string and a callback with 2 arguments called  req and resp.
  
  Prefessional developer receive this object in a variable name as "app".

  4.Finally start the server and wait for the client request by calling the server object's method listen() passing it the required port number and a callback. This callback will execute after the server started. Generally in this callback we print the message that "server is up and running"

Example:
  const express = require("express") //returns a function
  const app = express(); //return server object.

  app.get("/", (req, resp)=>{
    resp.send("Hello from express");
  })

  app.listen(3000, ()=>{
    console.log("Server is up and running at port 3000");
  })

Here send() did multiple tasks:
    *it set Content-Type and status-code.
    *It send the request to browser.
    *It close the connection after sending response. 
As we know, send() method close the connection after sending response. So we in a response we can have only one send() method:
  For example:
        app.get("/", (req, resp)=>{
          resp.send("Hello from express");
          resp.send("By");
        })
  Here, we will get error because connection will be closed by 1st call of send(), so on second call of send() we will get error i.e exceptation.

==========================================================
Printing server’s port
==========================================================
Express also tells us that on which port server is running.
  when we call the listen() method on server object then listen() method itself returns an object:
      const serverDetail = app.listen(3000, ()=>{})
    we can name this object as "serverDetail" or simply "server".
  This serverDetail object has a method called addreess().
  When we call the method address() then it also returns an object. This object has a property called as "port". So we can get the port as:
      const serverDetail = app.listen(3000, ()=>{
        console.log(`Server is running at port ${serverDetail.address().port}`)
      })
    
    So we get port as: serverDetail.address().port

Example:
  const express = require("express");
  const app = express(); 

  app.get("/", (req, resp)=>{
    resp.send("<h1>Hello from express</h1>");
  })

  const server = app.listen(3000, ()=>{
        console.log(`Server is running at port ${server.address().port}`)
  })
===================================================================================
The power of send() method
===================================================================================
The send() method of response object is a very powerful method as it does 3 tasks automatically:
  1.Sets the content-type and status code
  2.Sends the response
  3.Closes the  connection 

It sets the content-type by looking at our response data.
  If we pass in a string, it sets the Content-Type header to text/html.
  If we pass in an object or an array, it sets the Content-Type header to application/json and parses that parameter into JSON.

example:
  const express = require("express") 
  const app = express();

  app.get("/", (req, resp)=>{
    let person = {name: "Mohan", age: 25}
    resp.send(person);
  })

  const server = app.listen(3000, ()=>{
    console.log(`Server is running at port ${server.address().port}`)
  })

===========================================================================
Changing http header value
==========================================================================
As we seen, exprees automatically sets the content-type and satus code. But in some cases we may want to set the content type and status code like when checking and condition and it fails.

Response object provides us multiple methods.
One of the method of Response object is set() which we use to manually set the content-type i.e http header. It takes two argument:
  1. First argument is http header
  2. Second argument is header value

  eg: resp.set("Content-Type", "text/html")

  There is a shortcut for the Content-Type header:
   we can the method type() of response object for this.
  
  example:
    resp.type(".html") 
    resp.type("html") 
        it is equivalent to setting Content-Type to 'text/html'
    
    resp.type("json") 
    resp.type("application/json") 
        it is equivalent to setting Content-Type to 'application/json'

    resp.type("png")
        it is equivalent to setting Content-Type to 'image/png'
      
==============================================================================
Setting Status code
==============================================================================
To set status manually, Response object provides a method called resp.status().
We can also use cascadding on this method.

Example:  
      resp.status(404).end()
      resp.status(404).send("File not found!")

  ShortCut:
  ----------
  If we do not want any custom message and agree to use standard http message, we can use the shortcut by using the method resp.sendStatus()

  Example:
        resp.sendStatus(200)
          This is equivalent to: resp.status(200).send("OK")

        resp.sendStatus(403)
          This is equivalent to: resp.status(403).send("Forbidden")

        resp.sendStatus(404)
          This is equivalent to: resp.status(404).send("Not Found")

        resp.sendStatus(500)
          This is equivalent to: resp.status(500).send("Internal Server Error")

        
*/