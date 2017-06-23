'use strict';

function ProjectController($scope, $http, $routeParams, projectService) {
  projectService.getOne(function(response) {
    console.log('@ProjectCtrl:getOne');
    $scope.project = {};
    $scope.project = response.data;
  });
};

module.exports = ProjectController;