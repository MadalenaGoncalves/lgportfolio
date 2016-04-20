var db = require('./db/db');
var express = require('express');
var router = express.Router();

var path = require('path');
var projects = require('./data/getProjects.js');

router.get('/', function (req, res) {
    res.sendFile("index.html");
});
router.get('/data', function (req, res) {    
    projects.getProjects(req,res);
});

 
// router.get('/home', function (req, res) {
//   res.sendFile(C_VIEW_PATH + "/index.html");
// });

router.get('/projects', function (req, res) {
  db.find(function (err,docs) {
      if(err) console.log("ERROR in project.find : " + err);
      res.send(docs);
  });
});

module.exports = router;