'use strict';

function CMSController($scope, $http, dataService) {

  let _this = this;
  _this.projects;
  _this.formProject;

  // Populate the projects variable on page load
  dataService.getPortfolio(function(response) {
    console.log('@cmsCtrl:dataService.getPortfolio()');
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
    console.log('@cmsCtrl:dataService.reset()');
    dataService.reset(function(response) {
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
      _this.adding = !this.adding;
      _this.editing = false;
    }
    else {
      _this.formProject = proj;
      _this.editing = !this.editing;
      _this.adding = false;
    }
  }
  
  this.cancel = function() {
    _this.adding = !this.adding;
    _this.formProject = {};
  }

  this.submit = function(proj) {
    console.log('@cmsCtrl: submit() ');
    console.log(proj);
    // if ("undefined" === typeof proj._id) {
    //   dataService.addProject({proj: proj}, function(response) {
    //     console.log('@cmsCtrl:dataService.addProject()');
    //     _this.projects.push(response.data);
    //     _this.formProject = {};
    //     _this.adding = false;
    //   });
    // }
    // else {
    //   dataService.updateProject({id: proj._id, proj: proj}, function(response) {
    //     console.log('@cmsCtrl:dataService.updateProject()');
    //     // _this.projects.push(response.data);
    //     _this.formProject = {};
    //     _this.editing = false;
    //   });
    // }

    dataService.upsertProject({proj: proj}, function(response) {
      console.log('@cmsCtrl:dataService.upsert()');
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
    dataService.deleteProject({id: proj._id}, function(response) {
      console.log('@dataService.deleteProject callback');
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
