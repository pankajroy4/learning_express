/* 
Route parameters v/s query string:
=================================

  Both, query strings and route parameters, carry information to the server through the URL and thus serve the same purpose.

  But they have some differences:
  -------------------------------

    * We don't need to change the route path to access query strings. But for parameters, we have to add them individually in the route.

    * We can access as many queries as we want in the route very easily because we don't have to add them to the route path. We just add them to the URL. But it is not the case with route parameters.

    * We need to add the parameter values in a specific order to the URL according to the route path. But we can put queries randomly, order doesn't matter.

  Which to use when ?
  -------------------
    As a best practice, it is recommended the following way: 
      If we want to identify a resource(i.e working on any single resource), we should use Route parameters . 
      But if we want to sort or filter items, then we should use query parameter.

      For example:
      /users/123 # Fetch a user who has id 123
      /users?occupation=programer # Fetch a list of programers

  Suppose we are implementing a RESTful API endpoints for an entity called Car.
    We would structure our endpoints like this:
      GET /cars                
      GET /cars/:id
      POST /cars
      PUT /cars/:id
      DELETE /cars/:id

      GET /cars?color=blue
      GET /cars?color=blue&brand=audi

*/