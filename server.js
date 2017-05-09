var express = require("express");
var app = express();
var bodyParser = require('body-parser')
var mysql      = require('mysql');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

var mysqlServiceName = process.env.DATABASE_SERVICE_NAME || "MYSQL";
var mysqlServiceNameHost = process.env[mysqlServiceName + '_SERVICE_HOST'],
    mysqlServiceNameDatabase = process.env[mysqlServiceName + '_DATABASE'],
    mysqlServiceNamePassword = process.env[mysqlServiceName + '_PASSWORD'],
    mysqlServiceNameUser = process.env[mysqlServiceName + '_USER'];

    console.log("mysqlServiceName=", mysqlServiceName);
    console.log("mysqlServiceNameHost=", mysqlServiceNameHost);
    console.log("mysqlServiceNameDatabase=", mysqlServiceNameDatabase);
    console.log("mysqlServiceNamePassword=", mysqlServiceNamePassword);
    console.log("mysqlServiceNameUser=", mysqlServiceNameUser);
    
 var connection = mysql.createConnection({
    host     : mysqlServiceNameHost,
    user     : mysqlServiceNameUser,
    password : mysqlServiceNamePassword,
    database : mysqlServiceNameDatabase
  });


  connection.connect(function(err){
      if(!err) {
          console.log("Database is connected ... nn");    
      } else {
          console.log("Error connecting database ... nn", err);    
      }
  });
/******************************
* APIs 
*******************************/

app.get('/', function(req, res) {
  res.send("Hello World!!!")
});

app.get('/data', function(req, res) {
    connection.query('SELECT * from users', function(err, rows, fields) {
      if (!err){
        console.log('The solution is: ', rows);
          res.send(rows);
      }
      else{
        console.log('Error while performing Query.');
      }
    });
    connection.end(function(err){
      if(!err) {
          console.log("Database is disconnected ... nn");    
      } else {
          console.log("Error disconnecting database ... nn");  
      }  
    });
});


var port = process.env.PORT || 8080;
app.listen(port, function() {
    console.log('App started on port:' + port);
});
