'use strict';

function ProjectController($scope, $http, $routeParams, dataService) {
// function ProjectController($scope, $http, $stateParams, dataService) {
  dataService.getProject(function(response) {
    console.log('@ProjectCtrl:getProject');
    $scope.project = {};
    $scope.project = response.data;
  });

  // $http.get('/projects/' + $routeParams.name).success(function(response) {
  //   console.log('@projCtrl.js : successfully called http.get(/projects/' + $routeParams.name + ')');
  //   $scope.project = {};
  //   $scope.project = response;
  // });

};

module.exports = ProjectController;