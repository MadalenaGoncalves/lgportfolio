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
  api.getAll(req, res);
});

router.post('/cms', function(req, res) {
	console.log("@router.js : post('/cms)");
  api.upsert(req,res);
});

router.delete('/cms/:id', function(req, res) {
  console.log("@router.js : delete('/cms/" + req.params.id + "')");
  api.delete(req, res);
});

// Use multer middleware to handle the uploading of images
var multer = require('multer');

var setUploadConfigs = function(configObj) {
  return multer({
            storage: multer.diskStorage({
                      destination: function(req, file, cb) {
                        cb(null, configObj.path);
                      },
                      filename: function(req, file, cb) {
                        if (!file.originalname.match(/\.(png|jpeg|jpg)$/i)) {
                          var err = new Error();
                          err.code = 'filetype';
                          return cb(err);
                        } else {
                          cb(null, Date.now() + '_' + file.originalname);
                        }
                      }
                    }),
            limits: { fileSize: configObj.filesize } 
        }).single(configObj.name);
}

var uploadThumbnail = setUploadConfigs({
      'path' : path.join(__dirname, './../../public/static/images/thumbnails'),
      'filesize' : 10000000, // 10MB  --> check the limits in the API
      'name' : 'projThumbnail'
    });

router.post('/uploadthumbnail', function(req, res) {
  console.log("@router.js : post('/uploadthumbnail");
  
  uploadThumbnail(req, res, function(err) {
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
        console.log('File uploaded');
        res.json({ success: true, message: 'File uploaded!' });
      }
    }
  });
});

// var uploadImage = setUploadConfigs({
//       'path' : path.join(__dirname, './../../public/static/images/portfolio'),
//       'filesize' : 10000000,
//       'name' : 'projImage'
//     });
// router.post('/uploadimage', function(req, res) {
//   console.log("@router.js : post('/uploadimage");
  
//   uploadImage(req, res, function(err) {
//     if (err) {
//       if (err.code === 'LIMIT_FILE_SIZE') {
//         res.json({ success: false, message: 'File size is too large. Max limit is 10MB' });
//       } else if (err.code === 'filetype') {
//         res.json({ success: false, message: 'Filetype is invalid. Must be .png or .jpg' });
//       } else {
//         res.json({ success: false, message: 'Unable to upload file' });
//       }
//     } else {
//       if (!req.file) {
//         res.json({ success: false, message: 'No file was selected' });
//       } else {
//         res.json({ success: true, message: 'File uploaded!' });
//       }
//     }
//   });
// });

module.exports = router;