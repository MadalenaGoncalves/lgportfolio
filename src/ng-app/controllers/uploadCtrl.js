'use strict';

function uploadController($scope, $timeout, uploadService) {
  let _this = this;
  let defaultThumbnailUrl = '/thumbnails/default.png';
  
  _this.thumbnailUrl = defaultThumbnailUrl;
  _this.file = {};
  _this.alert = '';
  
  _this.submitThumbnail = function() {
    _this.uploadingThumb = true;
    uploadService.uploadThumbnail(_this.file[0]).then(function(data) {
      if (data.data.success) {
        _this.uploadingThumb = false;
        _this.alert = 'alert alert-success'; // this is just for the ng-class
        _this.file = {};
      } else {
        _this.uploadingThumb = false;
        _this.alert = 'alert alert-danger';
        _this.file = {};
      }
    });
  };

  $scope.thumbnailChanged = function(files) {
    if (files.length > 0 && files[0].name.match(/\.(png|jpeg|jpg|gif)$/i)) {
      _this.uploadingThumb = true;
      
      var file = files[0];
      var fileReader = new FileReader();
      console.log("File name:" + file.name);
      
      fileReader.onload = function(e) {
        $timeout(function() {
          _this.thumbnailUrl = {};
          _this.thumbnailUrl = e.target.result;
          _this.uploadingThumb = false;
        });
      };

      fileReader.readAsDataURL(file);
    } else {
      _this.thumbnailUrl = {};
    }
  };

//   _this.cancelThumbnailUpload = function() {
//     // _this.thumbnailUrl = {};
//     _this.file = {};
//     _this.uploadingThumb = false;
//   }
};

module.exports = uploadController;
