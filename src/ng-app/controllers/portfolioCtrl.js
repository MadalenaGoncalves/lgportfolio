'use strict';

function PortfolioController($scope, $http, projectService) {
  projectService.getAll(function(response) {
    console.log('@portfolioCtrl:projectService.getAll()');
    $scope.projects = {};
    $scope.projects = response.data;
  });
};

module.exports = PortfolioController;