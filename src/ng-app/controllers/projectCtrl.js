'use strict';

function ProjectController($scope, $http, $routeParams, dataService) {
  dataService.getProject(function(response) {
    console.log('@ProjectCtrl:getProject');
    $scope.project = {};
    $scope.project = response.data;
  });
};

module.exports = ProjectController;