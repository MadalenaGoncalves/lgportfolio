'use strict';

function uploadService($http, $routeParams) {

  this.uploadThumbnail = function(file) {
    console.log('@uploadService.js: uploadThumbnail()');

    var fd = new FormData();
    fd.append('projThumbnail', file.upload); // this 'projThumbnail' name has to be the same in the html
    
    return $http.post('/upload/thumbnail', fd, {
        transformRequest: angular.identity,
        headers: { 'Content-Type': undefined }
    });
  };

  this.uploadMany = function() {
    var fd = new FormData();

    angular.forEach($scope.files, function(file) {
      fd.append('file',file)
    });

    return $http.post('/upload/images', fd,
    {
      transformRequest: angular.identity,
      headers: { 'Content-Type': undefined }
    });
  }
}

module.exports = uploadService;