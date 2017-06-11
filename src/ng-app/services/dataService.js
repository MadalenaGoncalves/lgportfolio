'use strict';

function dataService($http, $routeParams) {

  this.getPortfolio = function(callback) {
    console.log('@dataService:getPortfolio: get(/home).then(callback)');
    $http.get('/home').then(callback);
  };

  this.getProject = function(callback) {
    console.log('@dataService:getProject - name: ' + $routeParams.name);
    $http.get('/projects/' + $routeParams.name).then(callback);
  };

  this.saveProject = function(callback) {
    console.log('@dataService:saveProject');
    console.log('Project saved');
  };
  
  this.deleteProject = function(callback) {
    console.log('@dataService:deleteProject');
    console.log('Project deleted');
  };
}
module.exports = dataService;