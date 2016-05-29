var express = require('express');
var router = express.Router();
// var path = require('path');

var portfolio = require('./data/api/loadPortfolio.js');
var dbreset = require('./data/resetData/dbReset.js');
var project = require('./data/api/loadProject.js');

router.get('/', function (req, res) {
    console.log("@router.js : get('/')");
    res.sendFile("index.html");
});

router.get('/data', function (req, res) {
    console.log("@router.js : get('/data')");
    portfolio.loadPortfolio(req, res);
});

router.get('/reset', function (req, res) {
    console.log("@router.js : get('/reset')");
    dbreset.reset(req, res, function () {
        portfolio.loadPortfolio(req, res);
    });
});

router.get('/p/:name', function (req, res) {
    console.log("@router.js : get('/p/" + req.params.name + "')");
    project.loadProject(req, res, req.params.name);
});

module.exports = router;