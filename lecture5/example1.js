/* 
Performing Validations:
===============================
We cannot trust that the client will always send valid data.
So before we process the data we must validate it and if the validation fails we must return appropriate error message to the client .

For this purpose the Node.js platform has a special 3rd party module called Joi .

Joi module is a popular module for data validation. 
This module validates the data based on schemas. 

There are various functions like optional(), required(), min(), max(), etc which makes it a user-friendly module for validating the data.

Joi library is used for api calls validation.
In previous lectures we have use the library "Validator", but it only gives true false, so we do not use it for api calls.

Steps required to do validations with Joi
-------------------------------------------
  1.Perform an npm install of joi.

  2.Import “joi” using require(). This will return a class

  3.Create a schema object by calling its static method called Joi.object() passing it required types and constraints.

  4.Call the validate() method using schema object passing it the object to be validated .
    It will return a result object which will contain a property called error if the validation fails otherwise this property will not be present .

    The error property itself is an object that holds an array of objects called details with a property called message containing exact error message. Means like this:
    error = { details: [
                  {
                    message: "This is the error message" 
                    path: .....,
                    type: .....,
                    context: ....       
                  }, 
                  { 
                    message: "This is the error message" 
                    path: .....,
                    type: .....,
                    context: ....    
                  }
            ]}

Example: see app1.js

*/
