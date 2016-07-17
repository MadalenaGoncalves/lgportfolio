// Initialization of the express framework
var express = require('express'),
    bodyParser = require('body-parser'),
    favicon = require('serve-favicon'),
    path = require('path'),
    http = require('http'),
    mongoose = require('mongoose'),
    databaseName = 'lgportfolio';

// Server setup and middleware
var app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname)); // static path to root
app.use(favicon(__dirname + '/public/static/images/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routers
app.use(express.static(path.join(__dirname, 'public/static'))); // static path to index.html and other  views
app.use(express.static(path.join(__dirname, 'public/static/images'))); // static path to images
app.use(express.static(path.join(__dirname, 'public/vendor'))); // static path to vendor scripts
app.use(express.static(path.join(__dirname, 'public/js'))); // static path to angular controllers
app.use(express.static(path.join(__dirname, 'data')));      // static path to database queries and models
// app.use('/partials', express.static(__dirname + '/app/partials')); ---> exemplo
var routes = require('./router');
// app.all('/*', function(req, res, next) {
//     // Just send the index.html for other files to support HTML5Mode
//     res.sendFile('/public/static/index.html', { root: __dirname });
// });
app.use('/', routes);
app.use(function (req, res, next) {
    console.log('404 - Client tried to get [' + req.url + ']');
    res.status(404).send('404 - Sorry cant find that!');
});

// Other middleware
// app.use( express.logger( 'dev' ));
// app.use( express.cookieParser()); // use express cookies to recognize users
// app.use( express.methodOverride());
// app.use( express.errorHandler());

// create connection to database
// mongoose.connect('mongodb://localhost/lgportfoliodb');
mongoose.connect('mongodb://cheetara63:123123@ds015774.mlab.com:15774/lgportfolio');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
// create http server
db.once('open', function () {
    http.createServer(app).listen(app.get('port'), function () {
        console.log('Express server listening on port ' + app.get('port'));
    })
});