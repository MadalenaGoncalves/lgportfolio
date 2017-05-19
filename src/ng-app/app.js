'use strict';

// import './../../public/sass/styles.scss';

var angular = require('angular');

angular
.module('architectureportfolio', ['ngRoute','ngMaterial','ngMessages']) // 'ngAnimate','ngAria','ngMaterial','ngMessages'])
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
      // templateUrl: '../templates/portfolio.pug',
      templateUrl: '../templates/portfolio.pug',
      controller: 'PortfolioController'
      // controllerAs: 'controller'
    })
    .when('/reset', {
      redirectTo: '/home'
    })
    .when('/projects/:name', {
      templateUrl: '../templates/project.pug',
      controller: 'ProjectController'
    })
    .when('/about', {
      templateUrl: '../templates/about.pug'
    })
    .when('/contacts', {
      templateUrl: '../templates/contacts.pug',
      controller: 'ContactsController'
    })
    .otherwise({
      redirectTo: '/home'
    });
}]);

require('./controllers');
// require('./directives');
// require('./services');