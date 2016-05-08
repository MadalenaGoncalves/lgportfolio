var express = require('express');
var router = express.Router();
var path = require('path');

var projects = require('./db/data/getProjects.js');
var dbreset = require('./db/resetData/dbReset.js');

router.get('/', function (req, res) {
    res.sendFile("index.html");
});
router.get('/data', function (req, res) {
    projects.getProjects(req,res);
});
router.get('/reset', function (req, res){
    dbreset.reset(req,res,function(){
        projects.getProjects(req,res);
    });
});

module.exports = router;