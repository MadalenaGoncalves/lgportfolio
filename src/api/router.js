'use strict';

const express = require('express'),
      path    = require('path'),
      api                = require('./api.js'),
      dbreset            = require('./dbReset.js'),
      contactFormHandler = require('./contactFormHandler'),
      uploadHanlder      = require('./uploadHandler');

const router  = express.Router();


// rewrite virtual urls to angular app to enable refreshing of internal pages
// router.get('*', function (req, res, next) {
//   console.log("@router.js : get('*')");
//   res.sendFile(path.join(__dirname, './../../public/templates'));
// });

router.get('/home', function(req, res) {
	console.log("@router.js : get('/home')");
  api.getAll(req, res);
});

router.get('/reset', function(req, res) {
	console.log("@router.js : get('/reset')");
	dbreset.reset(req, res, function () {
    api.getAll(req, res);
	});
});

router.get('/projects/:id', function(req, res) {
	console.log("@router.js : get('/projects/" + req.params.id + "')");
  api.getOne(req,res);
});

router.post('/contacts', function(req, res){
  console.log("@router.js : post('/contacts')");
	contactFormHandler.sendMail(req, res);
});

router.get('/cms', function(req, res) {
  console.log("@router.js : get('/cms')");
  api.getAllFull(req, res);
});

router.post('/cms', function(req, res) {
	console.log("@router.js : post('/cms)");
  api.upsert(req,res);
});

router.delete('/cms/:id', function(req, res) {
  console.log("@router.js : delete('/cms/" + req.params.id + "')");
  api.delete(req, res);
});

router.post('/upload/thumbnail', function(req, res) {
  console.log("@router.js : post('/upload/thumbnail')");
  
  uploadHanlder.uploadThumbnail(req, res, function(err) {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        console.log('File size is too large');
        res.json({ success: false, message: 'File size is too large. Max limit is 10MB' });
      } else if (err.code === 'filetype') {
        console.log('Wrong filetype');
        res.json({ success: false, message: 'Filetype is invalid. Must be .png or .jpg' });
      } else {
        console.log('Other error');
        res.json({ success: false, message: 'Unable to upload file' });
      }
    } else {
      if (!req.file) {
        console.log('No file');
        res.json({ success: false, message: 'No file was selected' });
      } else {
        // api.updateThumbnail
        console.log('File uploaded');
        res.json({ success: true, message: 'File uploaded!' });
      }
    }
  });
});

module.exports = router;