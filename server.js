// Database setup
// var db = require('./db/db');
// db.connect('mongodb://localhost/lgportfoliodb');

// Server setup 
var express = require('express');
var app     = express();
var http    = require('http');

var path    = require('path');
var engine  = require('ejs-locals');
var querystring = require('querystring'); 

// all environments
app.set( 'port', process.env.PORT || 3000 );
app.engine( 'ejs', engine );
app.set( 'views', path.join( __dirname, 'views' ));
app.set( 'view engine', 'ejs' );


// Middleware
var routes = require('./router');
app.use('/',routes);

// app.use( express.favicon());
// app.use( express.logger( 'dev' ));
// app.use( express.cookieParser()); // use express cookies to recognize users
// app.use( express.bodyParser()); // add this before app.use( express.json());
// app.use(require('express-json'));
// app.use( express.urlencoded());
// app.use( express.methodOverride());
// app.use( express.errorHandler());
// app.use( express.static( path.join( __dirname, 'public' )));

// START SERVER
http.createServer(app).listen(app.get('port'), function(){
  console.log( 'Express server listening on port ' + app.get('port'));
} );
