'use strict';

var express = require('express');
var router = express.Router();

// var portfolio = require('./../data/api/loadPortfolio.js');
// var dbreset = require('./../data/resetData/dbReset.js');
// var project = require('./../data/api/loadProject.js');
// var contactFormHandler = require('./../data/api/contactFormHandler');

router.get('/', function(req,res) {
	res.render('index');
});
// router.get('/', function (req, res) {
// //     console.log("@router.js : get('/')");
// //     res.sendFile("index.html");
// 	portfolio.loadPortfolio(req, res);
// });

// router.get('/home', function (req, res) {
// 	// console.log("@router.js : get('/home')");
// 	portfolio.loadPortfolio(req, res);
// });

// router.get('/reset', function (req, res) {
// 	// console.log("@router.js : get('/reset')");
// 	dbreset.reset(req, res, function () {
// 		portfolio.loadPortfolio(req, res);
// 	});
// });

// router.get('/projects/:name', function (req, res) {
// 	// console.log("@router.js : get('projects/" + req.params.name + "') OK");
// 	project.loadProject(req,res);
// });

// router.post('/contacts', function(req, res){
// 	contactFormHandler.sendMail(req, res);
// });

module.exports = router;