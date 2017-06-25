'use strict';

// Use multer middleware to handle the uploading of thumbnails
const multer = require('multer'),
      path   = require('path');

let setUploadConfigs = function(configObj) {
  return multer({
            storage: multer.diskStorage({
                      destination: function(req, file, cb) {
                        cb(null, configObj.path);
                      },
                      filename: function(req, file, cb) {
                        // if (!file.originalname.match(/\.(png|jpeg|jpg)$/i)) {
                        if (!file.originalname.match(/\.(png)$/i)) {
                          var err = new Error();
                          err.code = 'filetype';
                          return cb(err);
                        } else {
                          cb(null, 'proj'+api.getNext()+'.png');
                        }
                      }
                    }),
            limits: { fileSize: configObj.filesize } 
        });
}

exports.uploadThumbnail = function() {
  var conf = {
    'path' : path.join(__dirname, './../../public/static/images/thumbnails'),
    'filesize' : 10000000 // 10MB  --> check the limits in the API
  };

  return setUploadConfigs(conf).single('projThumbnail');
}