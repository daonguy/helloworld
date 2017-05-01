var express = require("express");
var app = express();
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

/******************************
* APIs 
*******************************/

app.get('/', function(req, res) {
  res.send("Hello World!!!")
});


var port = process.env.PORT || 9080;
app.listen(port, function() {
    console.log('App started on port:' + port);
});

