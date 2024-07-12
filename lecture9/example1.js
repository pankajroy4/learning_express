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
      resp.render("path_of_ejs_file", object)

    Note: We can pass variables in second argument.
          But we have to pass it as object.
          Suppose, we have a variable:
            let str = "John";
          To pass it to ejs file we have to pass it as object:
             resp.render("path_of_ejs_file", {name: str})
          
        In ejs file we can access str value like:
           <p> Hello <%= name %> , welcome to EJS learning.</p>

    *So, 2nd argument of render() method must be an object.
    Even we have to pass a variable, we have to pass it as object

Adding js in ejs:
===================
To add JS code in EJS , there are 3 major tags that we will need to understand:

1: Expression tag:  <%= %>
  <%=  some expression %>
  Called expression-tag and used to embed code that is supposed to return some output,  like the result of an expression/computation.

  Example:
    <%= 10+20 %>
    <%= Math.pow(2,3) %>

2: Scriptlet tag: <% %>
  <%  some code %>
  This is used to embed javascript codes that do not return output e.g control flow, conditionals, variable declaration, etc

  Example:
    <% let a=10; %>
    <% if(a%2==0) %>
    <% for(let i=1;i<=5;i++) %>

3: Partial include tag: <%- %>
    <%- include("path of other partials") %>
    This is used to add the partial(reusable codes) to our main ejs files.

    Example:
      <%- include("../partials/menu.ejs") %>

==================================================
Passing data to ejs file from app.js file
==================================================
As we know we can pass data to ejs by passing second argument to resp.render() method.

This second argument must be an object, which will be accessible in the EJS template file
  Example1:
    Suppose, we have an object:
      let person = {name: "John", age: 25}
    To pass it to ejs file we have to pass it as object:
        resp.render("path_of_ejs_file", {person_details: person})
    
    In ejs file we can access person object like:
      <p> Hello <%= person_details.name %> </p>
      <p> your age is <%= person_details.age %> </p>

  Example2:
   Suppose, we have an array of objects:
    let persons = [
        {name: "Sachin", city: "Bhopal", phone: 9155368245},
        {name: "Mohan", city: "Indore", phone:  8652437852},
        {name: "Pankaj", city: "Patna", phone: 7536124586},
      ]
    
    To pass it to ejs file we have to pass it as object:
      resp.render("path_of_ejs_file", {persons: persons})
    
    In ejs file we can access persons array of objects like:

      <% persons.forEach((p)=>{ %>
        <p> Name: <%= p.name%> </p>
        <p> City: <%= p.city%> </p>
        <p> Phone: <%= p.phone%> </p>
        <hr/>
      <%})%>

*/