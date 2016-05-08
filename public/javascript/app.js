// var app = angular.module('homepage', ['ngRoute']);

var app = angular.module('homepage', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/data', {
        templateUrl: '/templates/project-grid/index.html'
    })
    .when('/reset', {
      redirectTo: '/data' 
    })
    .otherwise({
      redirectTo: '/data' 
    });
}]);