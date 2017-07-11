'use strict';

function CMSController($scope, $http, $timeout, projectService, uploadService) {

  let _this = this;

  // Initialize validation variables
  _this.adding = false;
  _this.editing = false;
  _this.thumbnailChanged = false;
  _this.imagesChanged = false
  _this.blockForm = false;
  _this.file = {};
  _this.alert = '';

  // Populate the projects variable on page load
  projectService.getAllFull(function(response) {
    console.log('@cmsCtrl:projectService.getAllFull()');
    _this.projects = {};
    _this.projects = response.data;
  });

  // Year values to populate select elements
  let year = new Date().getFullYear();  
  _this.years = [];
  for (var i = 2004; i <= 2030; i++) {
    _this.years.push(i);
  }

  // ############################################
  // ### Toggle editor ##########################
  // ############################################
  this.toggleForm = function(proj) {
    console.log('@cmsCtrl: toggleForm() ');
    if("undefined" === typeof proj) {
      _this.project = {};
      _this.editing = false;
      _this.adding = true;
    }
    else if(!_this.editing || proj._id != _this.project._id) {
      _this.project = {};
      _this.project = proj;
      _this.adding = false;
      _this.editing = true;
    }
    else {
      _this.editing = false;
      _this.project = {};
    }
  }
  
  this.cancel = function() {
    _this.adding = false;
    _this.editing = false;
    _this.project = {};
    _this.thumbnailUrl = '';
    _this.thumbnailChanged = false;
  }
  
  // ############################################
  // ### Watch thumbnail changes ################
  // ############################################
  $scope.thumbnailChanged = function(files) {
    if (files.length > 0 && files[0].name.match(/\.(png|jpeg|jpg|gif)$/i)) {
      
      var file = files[0];
      var fileReader = new FileReader();
      console.log("File name:" + file.name);
      
      fileReader.onload = function(e) {
        $timeout(function() {
          _this.thumbnailUrl = '';
          _this.thumbnailUrl = e.target.result;
        });
      };

      fileReader.readAsDataURL(file);
      _this.thumbnailChanged = true;
    } else {
      _this.thumbnailUrl = '';
      _this.thumbnailChanged = false;
    }
  };

  // ############################################
  // ### Form submit ############################
  // ############################################
  this.submit = function(proj) {
    console.log('@cmsCtrl: submit() ');

    _this.inProgress = true;

    projectService.upsert({proj: proj}, function(response) {
      console.log('@cmsCtrl:projectService.upsert()');
      if( "undefined" === typeof proj._id ) {
        _this.projects.push(response.data);
        _this.adding = false;
      }
      else {
        _this.editing = false;
      }
      _this.project = {};      
    });

    console.log("projectID : ?");

    // if(_this.thumbnailChanged) {
    //   console.log('change thumbnail here');
    // }

    // if(_this.imagesChanged) {
    //   console.log('change images here');
    // }
  }
  _this.submitThumbnail = function() {
    _this.uploadingThumb = true;
    uploadService.uploadThumbnail(_this.file[0]).then(function(data) {
      if (data.data.success) {
        _this.alert = 'alert alert-success'; // this is just for the ng-class
        _this.file = {};
      } else {
        _this.alert = 'alert alert-danger';
        _this.file = {};
      }
    });
  };

  // ############################################
  // ### Delete project #########################
  // ############################################
  this.delete = function(idx) {
    console.log('@cmsCtrl: delete()');

    // ToDo: alert box to confirm action
    
    var proj = _this.projects[idx];
    // ToDo: delete thumbnail
    // Todo: delete images
    projectService.delete({id: proj._id}, function(response) {
      console.log('@projectService.delete()');
      _this.projects.splice(idx, 1);
    });
  }

  // ############################################
  // ### Reset DB ###############################
  // ############################################
  this.reset = function() {
    console.log('@cmsCtrl:projectService.reset()');
    projectService.reset(function(response) {
      _this.projects = {};
      _this.projects = response.data;
    });
  };

};

module.exports = CMSController;
