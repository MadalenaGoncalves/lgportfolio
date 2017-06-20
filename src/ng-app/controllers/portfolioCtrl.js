'use strict';

function PortfolioController($scope, $http, dataService) {
  dataService.getPortfolio(function(response) {
    console.log('@portfolioCtrl:dataService.getPortfolio()');
    $scope.projects = {};
    $scope.projects = response.data;
  });
};

module.exports = PortfolioController;