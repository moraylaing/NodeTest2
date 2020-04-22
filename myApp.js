
var express = require('express');
var app = express();
var bodyParser = require("body-parser");

// --> 7)  Mount the Logger middleware here

/*app.use(function(req, res, next)
        {
  console.log(req.method + ' ' + req.path + ' - ' + req.ip); 
  next(); 
}) */


// --> 11)  Mount the body-parser middleware  here

app.use(bodyParser.urlencoded(
  { 
    extended: false 
  }
));
/** 1) Meet the node console. */


/** 2) A first working Express Server */


/** 3) Serve an HTML file */
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});


/** 4) Serve static assets  */
app.use(express.static(__dirname + "/public"));


/** 5) serve JSON on a specific route */
 /*app.get("/json", (req, res) => {
  res.json({
    message: "Hello json" 
  });
});*/

/** 6) Use the .env file to configure the app */
//console.log(process.env.MESSAGE_STYLE);  
//console.log("Hello World!");

//var messg="Hello Json";
/*app.get("/json", (req, res) =>  
{
  
  if (process.env.MESSAGE_STYLE === 'uppercase')   
  {
    //console.log(process.env.MESSAGE_STYLE); 
    //console.log("HELLO JSON");  
    res.json({
    message: "HELLO JSON" })  
  } 
  else 
  {
    //console.log(process.env.MESSAGE_STYLE);
    //console.log("Hello Json"); 
    res.json({
    message: "Hello json" }) 
  } 
});  */
/** 7) Root-level Middleware - A logger */
//  place it before all the routes !
app.use(function middleware(req, res, next) {
  // Do something
  // Call the next function in line:
  next();
}); 

/** 8) Chaining middleware. A Time server */
/*app.get("/now", (req, res, next) => 
{
  req.time = new Date().toString();//set the time
  console.log(req.time);  
  next();
  },
  (req, res) => 
  {
    res.send({
      time: req.time
    });
  }
);*/

/** 9)  Get input from client - Route parameters */
app.get("/:word/echo", (req, res) => {
  let LCTime= new Date();
  let formatted_date = LCTime.getFullYear();
  formatted_date+="-" + (LCTime.getMonth() + 1);
  formatted_date+= "-" + LCTime.getDate();
  formatted_date+= " " + (LCTime.getHours()-5);
  formatted_date+= ":" + LCTime.getMinutes();
  formatted_date+= ":" + LCTime.getSeconds(); 
  console.log(formatted_date); 
  req.time =formatted_date;//set the time
  const { word } = req.params;
  res.json({
     Echo: "Lost Circulation zone at "+req.time
  });
});
// URL to Test
//https://moraycodecamp-test2.glitch.me/LostCirculationValue/echo

/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>
app.get("/name", function(req, res) 
{
  const { word } = req.params;
  var firstName = req.query.first;
  var lastName = req.query.last;
  console.log(firstName +" "+lastName);
  var { first: firstName, last: lastName } = req.query;
  // Use template literals to form a formatted string
  res.json({
    name: `${firstName} ${lastName}` 
  });
});
// URL to test
//https://moraycodecamp-test2.glitch.me/name?first=Moray&last=laing

/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !
app.use(bodyParser.json()); 

/** 12) Get data form POST  */

app.post("/name", function(req, res) 
{
  // Handle the data in the request
  var string = req.body.first + " " + req.body.last;
  console.log(string); 
  res.json({ name: string }); 
});

// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

 module.exports = app;
