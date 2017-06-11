'use strict';

// import './styles.css';
var angular = require('angular');

angular
.module('architectureportfolio', ['ngRoute','ngMaterial','ngMessages']) // 'ngAnimate','ngAria','ngMaterial','ngMessages'])
.config(['$routeProvider', '$locationProvider' , function ($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $routeProvider
    .when('/home', {
      templateUrl: '/portfolio.html',
      controller: 'PortfolioController'
    })
    .when('/cms', {
      templateUrl: '/edit.html',
      controller: 'PortfolioController'
    })
    .when('/projects/:name', {
      templateUrl: '/project.html',
      controller: 'ProjectController'
    })
    .when('/about', {
      templateUrl: '/about.html'
    })
    .when('/contacts', {
      templateUrl: '/contacts.html',
      controller: 'ContactsController'
    })
    .when('/reset', {
      redirectTo: '/home'
    })
    .when('/', {
      redirectTo: '/home'
    })
    .otherwise({
      redirectTo: '/home'
    });
}]);

require('./index');