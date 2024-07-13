/* 
What is partial ?
==========================
  A partial is a reusable piece of HTML code that can be injected into other views. 

  Using partials in our templates makes our code cleaner and maintains the DRY principle by allowing us to use the same piece of code across multiple templates without writing it more than once.

How to use partials ?
==================================
To use partials in EJS, we take following steps:

  1. Create a folder, preferably called, “partials” inside the “views” folder
  2.Inside partials folder create the template file to be reused.

  3.Finally, add the partial to our main files by using the keyword include inside a special tag <%- include(path) %> and passing the relative file path to the partial as an argument to the include keyword.

  example:
      <%- include("../partials/header.ejs") %>
    See example folder app1

*/