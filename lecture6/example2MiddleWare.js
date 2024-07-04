/* 
Introduction to middleware:
=============================
Express is the most popular web framework for Node.js developers and middleware are the basic building blocks for Express applications.

In fact any Express application is actually a series of middleware function calls.

What is a middleware ?
==========================
Middleware in Express are functions that come into play after the server receives the request and before the response is sent to the client. 
They are arranged in a chain and are called in sequence.

What a middleware has ?
===========================
Every middleware function has access to the request, response, and the next middleware function in the application’s request-response cycle. 

* Moreover a middleware can modify the request/response object , pass them to the next middleware function or even terminate the req-response cycle by generating the response

In reality, all the routes we handled till now was a middleware in the terms of express.

But those route handler is the last code and after that request gets terminited, So they are called Controller.

Middleware are those functions or code which runs before the controller.

Every middleware has the power to do one of the following:
----------------------------------------------------------
 1. can terminate the request by sending a response.
 2. can foreward the request to next middleware using next() fucntion.

-----------------------------------------------------------
What can a middleware do ?
===================================
A middleware function can perform following tasks:
  Authorization
  Logging (Creating logs in terminal)
  Error Handling
  Rate Limiting
  Validation
  Any other business logic
*/