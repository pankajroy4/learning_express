/* 
What is a template engine ?
==================================
Template Engines allow us to generate dynamic HTML from our Express server.
In short they allow us to merge JS Code inside an HTML file thereby generating dynamic content.

How a template engine works ?
=================================
A template engine works in a very simple manner:

  1. We create a template with the appropriate syntax.
  2. In our Express server we set the appropriate route to pass the request the template.
  3. Along with the request we pass JS variables/arrays/objects to the template.
  4. Inside the template we use these variables.
  5. Finally these are compiled in real time as the template gets rendered.

Examples of template engines:
===============================
There are many template engines available for Node.js. 
Each template engine uses a different syntax to define HTML template and inject data into it.

The following is a list of some very commonly used template engines for Node.js:
  Pug ( previously called Jade)
  EJS
  Mustache
  Dust.js
  Nunjucks
  Handlebars
  Haml

We will be using EJS in this course.

Steps needed to use ejs:
==============================
To use EJS we need to follow the below mentioned steps:
  1. Perform an npm install of EJS.

  2: Create a folder called views in the root directory. This is because EJS always looks inside the views folder while resolving template files.

  3: Inside that folder create an HTML file with the extension .ejs

Now in the JS file take following steps:
  1: Inform Express that we want to use EJS as our view engine.

    This is done by calling the set() method of app object passing it 2 arguments: ‘view-engine’ and ‘ejs’ as:
      app.set("view-engine", "ejs")

  Note that we do not have to call require() for EJS as Express will automatically load it.

  2: Finally from our route handler we have to call the method render() of response object passing it the .ejs filepath/name, required variables, object etc and Express will render the file and send the output to client.

Adding js in ejs:
===================
Time: 29 minutes
*/