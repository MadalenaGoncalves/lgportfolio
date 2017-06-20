'use strict';

function dataService($http, $routeParams) {

  this.getPortfolio = function(callback) {
    console.log('@dataService:getPortfolio: get(/home).then(callback)');
    $http.get('/home').then(callback);
  };

  this.getProject = function(callback) {
    console.log('@dataService:getProject - id: ' + $routeParams.id);
    console.log($routeParams);
    $http.get('/projects/' + $routeParams.id).then(callback);
  };

  // this.addProject = function(proj, callback) {
  //   console.log('@dataService:addProject');
  //   $http.post('/cms',proj).then(callback);
  // };

  // this.updateProject = function(data, callback) {
  //   console.log('@dataService:updateProject - id: ' + data.id);
  //   $http.post('/cms/' + data.id, data.proj).then(callback);
  // };

  this.upsertProject = function(data, callback) {
    console.log('@dataService:upsert - id: ' + data.proj._id);    
    $http.post("/cms", data.proj).then(callback);
  };

  this.deleteProject = function(proj, callback) {
    console.log('@dataService:deleteProject - id: ' + proj.id);
    $http.delete('/cms/' + proj.id).then(callback);
  };

  this.reset = function(callback) {
    console.log('@dataService:reset');
    $http.get('/reset').then(callback);
  }
}

module.exports = dataService;