'use strict';

function uploadService($http, $routeParams) {

  this.uploadThumbnail = function(file) {
    console.log('@uploadService.js: uploadThumbnail()');

    var fd = new FormData();
    fd.append('projThumbnail', file.upload); // this 'projThumbnail' name has to be the same in the html
    
    return $http.post('/uploadthumbnail', fd, {
        transformRequest: angular.identity,
        headers: { 'Content-Type': undefined }
    });
  };
}

module.exports = uploadService;