// var app = angular.module('homepage', ['ngRoute']);

var app = angular.module('homepage', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/data', {
      templateUrl: '/templates/portfolio/index.html'
    })
    .when('/reset', {
      redirectTo: '/data'
    })
    .when('/p/:name', {
      templateUrl: '/templates/project/index.html',
      controller: 'pController'
    })
    .otherwise({
      redirectTo: '/data'
    });
}]);

app.controller("pController", function ($scope, $http, $routeParams) {
  $scope.name = $routeParams.name;
  console.log("scope: " + $scope.name);
  
  $http.get("/p/"+$scope.name).success(function (response) {
    $scope.project = response;
    console.log("scope2 OK");
  });
});