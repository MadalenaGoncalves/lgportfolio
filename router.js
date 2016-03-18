var db = require('./db/db');
var express = require('express');
var router = express.Router();

var path = require('path');
var C_VIEW_PATH = path.join(__dirname, "/index.html");

router.get('/', function (req, res) {
    res.send('Hi! My name is Madalena');
});
 
router.get('/home', function (req, res) {
  res.sendFile(C_VIEW_PATH);
});
router.get('/projects', function (req, res) {
  db.find(function (err,docs) {
      if(err) console.log("ERROR in project.find : " + err);
      res.send(docs);
  });
});

module.exports = router;

// function route(handle, pathname, response, postData){
// 	console.log("About to route a request for " + pathname);

// 	if(typeof handle[pathname] === "function"){
// 		return handle[pathname](response,postData);
// 	}
// 	else{
// 		console.log("No request handler found for " + pathname);
// 	    response.writeHead(404, {"Content-Type": "text/plain"});
// 	    response.write("404 Not found");
// 	    response.end();
// 	}
// }

// exports.route = route;