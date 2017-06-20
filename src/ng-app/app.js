'use strict';

// import './styles.css';
var angular = require('angular');

angular
.module('architecturePortfolio', ['ngRoute','ngMaterial','ngMessages']) // 'ngAnimate','ngAria','ngMaterial','ngMessages'])
.config(['$routeProvider', '$locationProvider' , function ($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $routeProvider
    .when('/home', {
      // redirectTo: '/cms'
      templateUrl: '/portfolio.html',
      controller: 'PortfolioController',
      controllerAs: 'portfolioCtrl'
    })
    .when('/cms', {
      templateUrl: '/cms.html',
      controller: 'CMSController',
      controllerAs: 'cmsCtrl'
    })
    .when('/projects/:id', {
      templateUrl: '/project.html',
      controller: 'ProjectController',
      controllerAs: 'projectCtrl'
    })
    .when('/about', {
      templateUrl: '/about.html'
    })
    .when('/contacts', {
      templateUrl: '/contacts.html',
      controller: 'ContactsController',
      controllerAs: 'contactsCtrl'
    })
    .when('/reset', {
      redirectTo: '/cms'
    })
    .when('/', {
      redirectTo: '/home'
    })
    .otherwise({
      redirectTo: '/home'
    });
}]);

require('./index');