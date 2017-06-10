'use strict';

const express = require('express'),
      path    = require('path'),
      router  = express.Router();
      
const portfolio          = require('./loadPortfolio.js'),
      project            = require('./loadProject.js'),
      dbreset            = require('./dbReset.js'),
      contactFormHandler = require('./contactFormHandler');

// rewrite virtual urls to angular app to enable refreshing of internal pages
router.get('*', function (req, res, next) {
    res.sendFile(path.join(__dirname, './../../public/templates'));
});

router.get('/home', function(req, res) {
	console.log("@router.js : get('/home')");
	portfolio.loadPortfolio(req, res);
});

router.get('/reset', function(req, res) {
	console.log("@router.js : get('/reset')");
	dbreset.reset(req, res, function () {
		portfolio.loadPortfolio(req, res);
	});
});

router.get('/projects/:name', function(req, res) {
	console.log("@router.js : get('/projects/" + req.params.name + "')");
	project.loadProject(req,res);
});

router.post('/contacts', function(req, res){
  console.log("@router.js : post('/contacts')");
	contactFormHandler.sendMail(req, res);
});

router.get('/cms', function(req, res) {
  console.log("@router.js : get('/cms')");
  portfolio.loadPortfolio(req, res);
});

module.exports = router;