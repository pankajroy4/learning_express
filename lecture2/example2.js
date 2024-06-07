/* 
What is an API
====================================================================
  API is the acronym for Application Programming Interface, and is a software intermediary that allows two applications to talk to each other.

  In simple terms an API is defined as a code that helps two different software’s to communicate and exchange data with each other.

====================================================================
What is rest ?
====================================================================
  REST stands for Representational State Transfer, and it is an  architectural style or a set of rules that developers follow when they create their own API .

  Its principles were formulated in 2000 by computer scientist named  Roy Fielding and gained popularity as a standard method of machine-to-machine communication.
  
Why it is called rest?
--------------------------
  In a client-server communication, REST suggests to create an object of the data requested by the client and send the values of the object in response to the client. 

  For example, if the user is requesting for getting details of a movie  which is currently played at DB Mall , Bhopal, then we can create an object on the server-side, store movie details in it and transmit it to the client .

  So, over here, we have an object and we are sending the current state of an object. 
  This is why REST is known as Representational State Transfer.

  Rest suggest us to send resposne as an object. As we know each object has some properties and values. These values of the object's properties represents the object's 'state' at a given point of time.
  
    Example:
        let person1 = {name: "Amit", age: 25}

        Here name and age are properties.
            "Amit" and 25 are the values of the properties. This represent the state of the person1 at this point of time.
          
          In future, age of person1 will change. This will represents the change in state of person1
           
    So, we actually sends the "state" of an object as resposne.
    This is why it is called Representational State Transfer (REST)

  What is restful API
  -------------------
  The api which follow the design principle of REST is restful.
--------------------------------------------------------------------------------

A REST/RESTful  API is based on the universal HTTP protocol, and the information is usually returned in the JSON format that almost all of the programming languages can read. 

Thus it can be used by any site or application no matter what language it is written in because almost all of the programming languages can generate HTTP Request and can read JSON data.

Most popular HTTP protocol command or HTTP verbs/methods
--------------------------------------------------
1. get
2. post
3. put/patch
4. delete

This called CRUD.
Almost all restful api, atleast supports these for http methods.

======================================================================
What is api endpoint ?
======================================================================
  An API endpoint is a digital location where an API receives requests about a specific resource on its server. 


  In APIs, an endpoint is typically a uniform resource locator (URL) that provides the location of a resource on the server.

  examples:
          https://api.twitter.com/2/tweets/{id}
          https://api.github.com/users/{username}
          
          
================================================================================
What is routing in express ?
================================================================================
  In Express the term, Routing refers to the mechanism that determines how an application responds to a client request to a particular path/api endpoint and a specific HTTP request method (GET, POST, and so on).

  In simple terms, routing is controlling which function gets invoked whenever the user navigates to a particular URL using a particular HTTP method .

  Components of a route:
  ----------------------
  A route/api endpoint is made up of 3 major components:
    Http Method 
    Main url
    Resource

  There are other elements also in a route 
    For example , if the route carries data , then it will contain route parameters , but the above 3 are major components of a route.

  What are http methods ?
  -----------------------
  Http methods are actions that can be performed on a resource.
    The most common Http methods are: 
      get: For getting some data from the server.
      post: For creating new data at the server.
      put: For updating data at the server.
      delete: For deleting data at the server.

*/


// time: 0:31:00
