'use strict';

function CMSController($http, projectService) {

  let _this = this;
  _this.projects;
  _this.formProject = {};

  // Populate the projects variable on page load
  projectService.getAllFull(function(response) {
    console.log('@cmsCtrl:projectService.getAllFull()');
    _this.projects = {};
    _this.projects = response.data;
  });

  // ############################################
  // ### Front-end validation variables #########
  // ############################################
  _this.adding = false;
  _this.editing = false;

  // Year values to populate select elements
  let year = new Date().getFullYear();  
  _this.years = [];
  for (var i = 2004; i <= 2030; i++) {
    _this.years.push(i);
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
  
  // ############################################
  // ### Add/Edit project #######################
  // ############################################
  this.showForm = function(proj) {
    console.log('@cmsCtrl: showForm() ');
    if("undefined" === typeof proj) {
      _this.formProject = {};
      _this.editing = false;
      _this.adding = true;
    }
    else if(!_this.editing || proj._id != _this.formProject._id) {
      _this.formProject = {};
      _this.formProject = proj;
      _this.adding = false;
      _this.editing = true;
    }
    else {
      _this.editing = false;
      _this.formProject = {};
    }
  }
  
  this.cancel = function() {
    _this.adding = false;
    _this.editing = false;
    _this.formProject = {};
  }

  this.submit = function(proj) {
    console.log('@cmsCtrl: submit() ');

    projectService.upsert({proj: proj}, function(response) {
      console.log('@cmsCtrl:projectService.upsert()');
      if( "undefined" === typeof proj._id ) {
        _this.projects.push(response.data);
        _this.adding = false;
      }
      else {
        _this.editing = false;
      }
      _this.formProject = {};      
    });
  }

  // ############################################
  // ### Delete project #########################
  // ############################################
  this.delete = function(idx) {
    console.log('@cmsCtrl: delete()');
    var proj = _this.projects[idx];
    projectService.delete({id: proj._id}, function(response) {
      console.log('@projectService.delete()');
      _this.projects.splice(idx, 1);
    });
  }

  // this.initProject = function() {
  //   return {
  //     // "name": "",
  //     // "category": "",
  //     // "description": "",
  //     // "address": "",
  //     // "city": "",
  //     // "country": "",
  //     // "start": "",
  //     // "end": "",
  //     // "grossarea": 0.00,
  //     // "floorarea": 0.00,
  //     // "company": "",
  //     // "participation": "",
  //     // "images": []
  //   }
  // };
};

module.exports = CMSController;
