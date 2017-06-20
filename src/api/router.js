'use strict';

const express = require('express'),
      path    = require('path'),
      router  = express.Router();
      
const api                = require('./api.js'),
      dbreset            = require('./dbReset.js'),
      contactFormHandler = require('./contactFormHandler');

// rewrite virtual urls to angular app to enable refreshing of internal pages
// router.get('*', function (req, res, next) {
//   console.log("@router.js : get('*')");
//   res.sendFile(path.join(__dirname, './../../public/templates'));
// });

router.get('/home', function(req, res) {
	console.log("@router.js : get('/home')");
  api.getPortfolio(req, res);
});

router.get('/reset', function(req, res) {
	console.log("@router.js : get('/reset')");
	dbreset.reset(req, res, function () {
    api.getPortfolio(req, res);
	});
});

router.get('/projects/:id', function(req, res) {
	console.log("@router.js : get('/projects/" + req.params.id + "')");
  api.getProject(req,res);
});

router.post('/contacts', function(req, res){
  console.log("@router.js : post('/contacts')");
	contactFormHandler.sendMail(req, res);
});

router.get('/cms', function(req, res) {
  console.log("@router.js : get('/cms')");
  api.getPortfolio(req, res);
});

router.post('/cms', function(req, res) {
	console.log("@router.js : post('/cms)");
  // api.addProject(req,res);
  api.upsertProject(req,res);
});

// router.post('/cms/:id', function(req, res) {
// 	console.log("@router.js : post('/cms/" + req.params.id + "')");
//   // api.updateProject(req,res);
//   api.upsertProject(req,res);
// });

router.delete('/cms/:id', function(req, res) {
  console.log("@router.js : delete('/cms/" + req.params.id + "')");
  api.deleteProject(req, res);
});


module.exports = router;