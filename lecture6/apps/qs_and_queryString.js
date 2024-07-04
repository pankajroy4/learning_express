const querystring = require("querystring");
const qs = require("qs");

const urlEncodedData = "id=1234&order[items][0]=Mobile&order[items][1]=Watch"

console.log("Data:", urlEncodedData)
console.log("querystring result:", JSON.stringify(querystring.parse(urlEncodedData)));

console.log("qs result:",  JSON.stringify(qs.parse(urlEncodedData)))

/*
Output:
  Data: id=1234&order[items][0]=Mobile&order[items][1]=Watch
  querystring result: {"id":"1234","order[items][0]":"Mobile","order[items][1]":"Watch"}
  qs result: {"id":"1234","order":{"items":["Mobile","Watch"]}}

*/