// set up ====================================================            
var express = require('express');
var router  = express.Router();
var mongoose = require('mongoose');
var app = express();
var port = 9002;
var db = require('./config/database');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var mongoStore = require('connect-mongo')({session: expressSession});                                
// configuration =============================================            
mongoose.connect(db.url);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(expressSession({
  secret: 'SECRET',
  cookie: {maxAge: 60*60*1000},
  store: new mongoStore({
      mongooseConnection: mongoose.connection,
      collection: 'sessions'
    })
}));

app.use('/', express.static('./app'));
app.use('/assets', express.static('./assets'));

// routes ====================================================            
require('./app/routes.js')(router);

app.use('/', router);

// listen ====================================================            
app.listen(port);
console.log("App listening on port: " + port);
