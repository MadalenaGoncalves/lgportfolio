var db = require('./db/db');
var express = require('express');
var router = express.Router();

var path = require('path');
var C_VIEW_PATH = path.join(__dirname, "public/static");

router.get('/', function (req, res) {
    res.send('Hi! My name is Madalena');
});
 
router.get('/home', function (req, res) {
  res.sendFile(C_VIEW_PATH + "/index.html");
});
router.get('/projects', function (req, res) {
  db.find(function (err,docs) {
      if(err) console.log("ERROR in project.find : " + err);
      res.send(docs);
  });
});

module.exports = router;