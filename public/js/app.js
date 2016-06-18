// var app = angular.module('homepage', ['ngRoute']);

var app = angular
  .module('homePage', ['ngRoute'])
  .config(['$routeProvider', '$locationProvider', function ($routeProvider,$locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
      .when('/home', {
        templateUrl: '/views/portfolio/index.html',
        controller: 'PortfolioController'
        // controllerAs: 'controller'
      })
      .when('/reset', {
        redirectTo: '/home'
      })
      .when('/projects/:name', {
        templateUrl: '/views/project/index.html',
        controller: 'ProjectController'
      })
      .when('/about', {
        templateUrl: '/views/about/index.html'
      })
      .when('/contacts', {
        templateUrl: '/views/contacts/index.html',
        controller: 'ContactsController'
      })
      .otherwise({
        redirectTo: '/home'
      });
  }]);