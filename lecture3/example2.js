/*  
Route parameter and Query String:
========================================================
  Both allow us to capture data from client request.
  Route parameter is used to pull a specific data from server.
  Query string used to pull bulk data from server.

  1.Route parameters:
  ----------------------
    Route parameters are named URL segments that are used to capture the values specified at their position in the URL. 

    The captured values are populated in a special object called req.params. Request object has a nested object called params.

    The keys in this object will be names of route parameters specified in the path.

    Example1:
          Route path: /users/:userId
          Request URL: http://example.com/users/34
          req.params: { "userId": "34”}

    Example2:
          Route path: /users/:userId/books/:bookId
          Request URL: http://example.com/users/34/books/101
          req.params: { "userId": "34", "bookId": “101" }

  1.Query String:
  ----------------------
    The query string portion of a URL is the part of the URL after the question mark ?. 
      Example: 
         ?userId=34
        Here userId is the key and 34 is the value
    
    Each key=value pair is called a query parameter. 

    If our query string has multiple query parameters, they're separated by &. 
      Example:
        The below string has 2 query parameters, called userId and bookId:
        ?userId=34&bookId=101

        Here userId=34 and bookId=101 are called query parameter.
        And ?userId=34&bookId=101 is called query string.

    Express automatically parses the query parameters for us and stores them in the request object as query object.
    So to access it we just have to use req.query.

    query object is nested inside request object just like params object.


*/