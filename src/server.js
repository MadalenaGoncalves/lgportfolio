'use strict';

import './../public/css/styles.css';

// Initialization of the express framework
const express      = require('express'),
	    bodyParser   = require('body-parser'),
	    // favicon      = require('serve-favicon'),
      path         = require('path'),
      http         = require('http'),
      mongoose     = require('mongoose'),
      fs           = require('fs'),

// Database configurations
const dbconf = JSON.parse(fs.readFileSync('./../config/config.json', 'UTF-8'));
const port = process.env.PORT || 3000,
      local_uri = dbconf.local,
      mongolab_uri = dbconf.mongolab;

// Server setup
var app = express();
app.set('port', port);

// Templates
// app.set('view engine','html');
// app.set('views', path.join(__dirname, '../public/templates'));

// BodyParser middleware allows you to easily parse JSON objects
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(favicon(__dirname + '/public/static/images/favicon.ico'));

// Use middleware to define the routes to static files
//   Namespace: root
app.use(express.static(path.join(__dirname, './../public')));
app.use(express.static(path.join(__dirname, './../public/static/images')));
app.use(express.static(path.join(__dirname, './../public/templates')));

// Use middleware to define the routes to non-static files - can be defined in a different namespace, such as /api
var routes = require('./api/router');
app.use('/', routes);
app.use(function (req, res, next) {
	console.log('404 - Client tried to get [' + req.url + ']');
	res.status(404).send('404 - Sorry cant find that!');
});

// Database connection
mongoose.connect('mongodb://' + local_uri);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// Start server
db.once('open', function () {
	http.createServer(app).listen(app.get('port'), function () {
		console.log('Express server listening on port ' + app.get('port'));
	})
});

// testing commit
// second test commit