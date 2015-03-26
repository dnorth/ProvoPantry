// set up ====================================================            
var express = require('express');
var mongoose = require('mongoose');
var app = express();
var port = 9002;
var db = require('./config/database');
//var bodyParser = require('body-parser');                                

// configuration =============================================            
mongoose.connect(db.url);

app.use('/', express.static('./app'));

// routes ====================================================            
require('./app/routes.js')(app);

// listen ====================================================            
app.listen(port);
console.log("App listening on port: " + port);
