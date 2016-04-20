// This file should be called app.js 

// Initialization of the express framework
var express = require('express'),
    path    = require('path'),
    http    = require('http'),
    // bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    databaseName = 'lgportfolio';
// var engine  = require('ejs-locals');
// var querystring = require('querystring'); 

// Server setup
var app = express();
app.set( 'port', process.env.PORT || 3000 );
// app.use(bodyParser.json());                          // parse application/json
// app.use(bodyParser.urlencoded({extended:true}));     // parse application/x-www-form-urlencoded
    // app.engine( 'ejs', engine );
    // app.set( 'views', path.join( __dirname, 'public' ));
    // app.set( 'view engine', 'ejs' );

// Routers
var routes = require('./router');
app.use(express.static(__dirname)); // static path to root
app.use(express.static(path.join(__dirname, 'public/static'))); // static path to index.html
app.use(express.static(path.join(__dirname, 'public/javascript'))); // static path to angular controllers
app.use(express.static(path.join(__dirname, 'data'))); // static path to queries to database
app.use('/',routes);

 app.use(function(req, res, next) {
       console.log('404 - Client tried to get [' + req.url + ']');
       res.status(404).send('404 - Sorry cant find that!');
   });

// Other middleware
// app.use( express.favicon());
// app.use( express.logger( 'dev' ));
// app.use( express.cookieParser()); // use express cookies to recognize users
// app.use( express.bodyParser()); // add this before app.use( express.json());
// app.use(require('express-json'));
// app.use( express.urlencoded());
// app.use( express.methodOverride());
// app.use( express.errorHandler());

// Database setup
// mongoose.connect('mongodb://localhost/' + databaseName);
// var db = mongoose.connection;
// db.on(err,console.error);
// db.once('open',startServer);
// Start up the server
// function startServer(){   
//     var server = app.listen(app.get('port'), function(){
//         console.log( 'Express server listening on port ' + app.get('port'));
//     });
// }

http.createServer(app).listen(app.get('port'), function(){
    console.log( 'Express server listening on port ' + app.get('port'));
} );