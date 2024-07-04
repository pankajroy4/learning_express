/* 
Extracting form data:
===========================
When data is sent through HTML form using browser, it will be sent in body.

To extract form data in express, we have to use a middleware called express.urlencoded() as:

  app.use(express.urlencoded({extended: false}))
  app.use(express.urlencoded({extended: true}))

It will parse the incoming data in req.body object with the property name same as used in html form.
For example:
        <input type="text" name="fno">
      Then we can get this data as:
        req.body.fno
*/

/* 
How to get form data ?
===========================================
To extract form data we need to use a middleware function as shown below:

   app.use(express.urlencoded({ extended: false }));
    OR
   app.use(express.urlencoded({ extended: true }));

Whenever the user sends POST requests by submitting a form, browser will use application/x-www-form-urlencoded as the content-type to send the data. 

When we use the middleware "urlencoded",  then express use its internal library and parse the encoded data in javascript object into req.body object.
--------------------
To parse that data from the request body, we need to use the urlencoded() method.
  * With the extended option, we can choose between the query-string library or the qs library to parse the URL-encoded data. 

  We can set this option as true or false.

  * If it is set to false then the urlencoded() method will use the query-string library. 
  
  * When the extended is true, this method will use the qs library.

----------------------------------------------------------
query-string library and the qs library
========================================
As we know express either one of these library to parse the urlencoded data in js object.

When we pass { extended: false }, then express will use query-string library
When we pass { extended: true }, then express will use qs library

  Difference:
  ----------
  The query-string library is not able to handle nested object. It can only handle simple object
  The qs library can handle nested object as well as simple object.

  So whenever we want to handle both nested and simple object we should always pass {extended: true} to the method express.urlencoded() as argument.

How can be get data from client/browser in nested object when data is coming in urlencoded form?
--------------------------------------------------------------------------------
  we can get nested object in many ways.Like when a dropdown scrollable is used

  Example:
    const querystring = require("querystring");
    const qs = require("qs");

    const urlEncodedData = "id=1234&order[items][0]=Mobile&order[items][1]=Watch"

    console.log("Data:", urlEncodedData)
    console.log("querystring result:", JSON.stringify(querystring.parse(urlEncodedData)));

    console.log("qs result:",  JSON.stringify(qs.parse(urlEncodedData)))

    Output:
      Data: id=1234&order[items][0]=Mobile&order[items][1]=Watch
      querystring result: {"id":"1234","order[items][0]":"Mobile","order[items][1]":"Watch"}
      qs result: {"id":"1234","order":{"items":["Mobile","Watch"]}}

    As we can see, querystring result is unstructured, while
    qs result is well structured in JSON format.

    So if the Html form sends multiple values associated with single key , then qs library convert it in nested object.
*/