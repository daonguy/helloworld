var express = require("express");
var app = express();
var bodyParser = require('body-parser')
var mysql      = require('mysql');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',
    mysqlURL = process.env.OPENSHIFT_MYSQL_DB_URL || process.env.MYSQL_URL,
    mongoURLLabel = "";

if (mysqlURL == null && process.env.DATABASE_SERVICE_NAME) {
  var mysqlServiceName = process.env.DATABASE_SERVICE_NAME.toUpperCase(),
      mysqlServiceNameHost = process.env[mysqlServiceName + '_SERVICE_HOST'],
      mysqlServiceNamePort = process.env[mysqlServiceName + '_SERVICE_PORT'],
      mysqlServiceNameDatabase = process.env[mysqlServiceName + '_DATABASE'],
      mysqlServiceNamePassword = process.env[mysqlServiceName + '_PASSWORD']
      mysqlServiceNameUser = process.env[mysqlServiceName + '_USER'];
  var connection = mysql.createConnection({
    host     : mysqlServiceNameHost,
    user     : mysqlServiceNameUser,
    password : mysqlServiceNamePassword,
    database : mysqlServiceNameDatabase
  });

  connection.connect();

  connection.query('SELECT * from users', function(err, rows, fields) {
    if (!err)
      console.log('The solution is: ', rows);
    else
      console.log('Error while performing Query.');
  });

  connection.end();
};
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
    else
      console.log('Error while performing Query.');
  });
  connection.end(function(err){
    if(!err) {
        console.log("Database is disconnected ... nn");    
    } else {
        console.log("Error disconnecting database ... nn");    
    });
});


var port = process.env.PORT || 8080;
app.listen(port, function() {
    console.log('App started on port:' + port);
});

