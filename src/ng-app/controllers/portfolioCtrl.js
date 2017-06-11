'use strict';

function PortfolioController($scope, $http, dataService) {

  dataService.getPortfolio(function(response) {
    console.log('@portfolioCtrl:dataService.getPortfolio()');
    $scope.projects = {};
    $scope.projects = response.data;
  });
  
  // $scope.reset = function() {
  //   $http.get('/reset').then(function(response){
  //     console.log('@PortfolioCtrl: GET /reset');
  //     $scope.projects = {};
  //     $scope.projects = response.data;
  //   });
  // };

  // $http.get('/cms').then(function(){
  //   console.log('@PortfolioCtrl: GET /cms');
  //   $scope.projects = {};
  //   $scope.projects = response.data;
  // });

  // $http.post('/cms').then(function(){
  //   console.log('@PortfolioCtrl /cms');
  //   $scope.projects = {};
  //   $scope.projects = response.data;
  // });
};

module.exports = PortfolioController;