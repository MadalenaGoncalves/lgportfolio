'use strict';

function projectService($http, $routeParams) {

  this.getAll = function(callback) {
    console.log('@projectService:getAll: get(/home).then(callback)');
    $http.get('/home').then(callback);
  };

  this.getAllFull = function(callback) {
    console.log('@projectService:getAllFull: get(/cms).then(callback)');
    $http.get('/cms').then(callback);
  };

  this.getOne = function(callback) {
    console.log('@projectService:getOne - id: ' + $routeParams.id);
    $http.get('/projects/' + $routeParams.id).then(callback);
  };

  this.upsert = function(data, callback) {
    console.log('@projectService:upsert - id: ' + data.proj._id);    
    $http.post("/cms", data.proj).then(callback);
  };

  this.delete = function(proj, callback) {
    console.log('@projectService:delete - id: ' + proj.id);
    $http.delete('/cms/' + proj.id).then(callback);
  };

  this.reset = function(callback) {
    console.log('@projectService:reset');
    $http.get('/reset').then(callback);
  }
}

module.exports = projectService;