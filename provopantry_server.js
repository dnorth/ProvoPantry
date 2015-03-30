// set up ====================================================            
var express = require('express');
var router  = express.Router();
var mongoose = require('mongoose');
var app = express();
var port = 80;
var db = require('./config/database');
//var bodyParser = require('body-parser');                                

// configuration =============================================            
mongoose.connect(db.url);

app.use('/', express.static('./app'));
app.use('/assets', express.static('./assets'));

// routes ====================================================            
require('./app/routes.js')(router);

app.use('/', router);

// listen ====================================================            
app.listen(port);
console.log("App listening on port: " + port);
