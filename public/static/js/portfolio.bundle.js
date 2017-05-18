webpackJsonp([0],{

/***/ 2:
/***/ (function(module, exports) {

// var app = angular.module('homepage', ['ngRoute']);

var app = angular
  // .module('homePage', ['ngRoute','ngAnimate','ngAria','ngMaterial','ngMessages'])
  .module('homePage', ['ngRoute','ngMaterial','ngMessages'])
  .config(['$routeProvider', function ($routeProvider) {
  // .config(['$routeProvider', '$locationProvider','$provide', function ($routeProvider,$locationProvider,$provide) {
    // $provide.decorator('$sniffer', ['$delegate', function($delegate) {
    //   $delegate.history = true;
    //   return $delegate;
    // }]);
    // $locationProvider
    //   .html5Mode(true);
    $routeProvider
      .when('/home', {
        // templateUrl: '../templates/portfolio.jade',
        templateUrl: '../templates/portfolio.jade',
        controller: 'PortfolioController'
        // controllerAs: 'controller'
      })
      .when('/reset', {
        redirectTo: '/home'
      })
      .when('/projects/:name', {
        templateUrl: '../templates/project.jade',
        controller: 'ProjectController'
      })
      .when('/about', {
        templateUrl: '../templates/about.jade'
      })
      .when('/contacts', {
        templateUrl: '../templates/contacts.jade',
        controller: 'ContactsController'
      })
      .otherwise({
        redirectTo: '/home'
      });
  }]);

/***/ })

},[2]);