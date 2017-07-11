'use strict';

function uploadService($http, $routeParams) {

  this.uploadThumbnail = function(file) {
    console.log('@uploadService.js: uploadThumbnail()');
    
    var fd = new FormData();
    fd.append('thumbnail', file); // 'thumbnail' has to be the fieldname of the html input

    return $http.post('/upload/thumbnail', fd, {
        transformRequest: angular.identity,
        headers: { 'Content-Type': undefined }
    });
  };

  this.uploadImages = function(files) {
    console.log('@uploadService.js: uploadImages()');
    
    var fd = new FormData();
    angular.forEach(files, function(file) {
      fd.append('file',file)
    });

    return $http.post('/upload/images', fd, {
      transformRequest: angular.identity,
      headers: { 'Content-Type': undefined }
    });
  }
}

module.exports = uploadService;