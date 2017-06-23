'use strict';

function uploadController($scope, $timeout, uploadService) {
  $scope.file = {};
  $scope.thumbnailMessage = false;
  $scope.alert = '';

  $scope.submitThumbnail = function() {
    $scope.uploadingThumb = true;

    uploadService.uploadThumbnail($scope.file).then(function(data) {
      if (data.data.success) {
        $scope.uploadingThumb = false;
        $scope.alert = 'alert alert-success'; // this is just for the ng-class
        $scope.thumbnailMessage = data.data.message;
        $scope.file = {};
      } else {
        $scope.uploadingThumb = false;
        $scope.alert = 'alert alert-danger';
        $scope.thumbnailMessage = data.data.message;
        $scope.file = {};
      }
    });

  };

  $scope.thumbnailChanged = function(files) {
    if (files.length > 0 && files[0].name.match(/\.(png|jpeg|jpg)$/i)) {
      $scope.uploadingThumb = true;
      var file = files[0];
      var fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = function(e) {
        $timeout(function() {
          $scope.thumbnail = {};
          $scope.thumbnail.dataUrl = e.target.result;
          $scope.uploadingThumb = false;
          $scope.thumbnailMessage = false;
        });
      };
    } else {
      $scope.thumbnail = {};
      $scope.thumbnailMessage = false;
    }
  };

  $scope.cancelThumbnailUpload = function() {
    $scope.thumbnail = {};
    $scope.file = {};
    $scope.uploadingThumb = false;
    $scope.thumbnailMessage = false;
  }
};

module.exports = uploadController;