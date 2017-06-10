'use strict';

// import './styles.css';
var angular = require('angular');

angular
// .module('architectureportfolio', ['ui.router','ngMaterial','ngMessages']) // 'ngAnimate','ngAria','ngMaterial','ngMessages'])
// .config(['$stateProvider', '$locationProvider' , function ($stateProvider, $locationProvider) {
.module('architectureportfolio', ['ngRoute','ngMaterial','ngMessages']) // 'ngAnimate','ngAria','ngMaterial','ngMessages'])
.config(['$routeProvider', '$locationProvider' , function ($routeProvider, $locationProvider) {
  // $locationProvider.html5Mode(true).hashPrefix('!');
  // $locationProvider.html5Mode(false).hashPrefix('!');

  // var home = {
  //   name: 'home',
  //   url: '/',
  //   templateUrl: 'portfolio.html',
  //   controller: 'PortfolioController'
  // };
  // var project = {
  //   name: 'project',
  //   url: '/projects/{name}',
  //   templateUrl: 'project.html',
  //   controller: 'ProjectController'
  // };
  // var about = {
  //   name: 'about',
  //   url: '/about',
  //   templateUrl: '/about.html'
  // };
  // var contacts = {
  //   name: 'contacts',
  //   url: '/contacts',
  //   templateUrl: 'contacts.html',
  //   controller: 'ContactsController'
  // };
  // var cms = {
  //   name: 'cms',
  //   url: '/cms',
  //   templateUrl: 'edit.html',
  //   controller: 'PortfolioController'
  // };
  // var reset = {
  //   name: 'reset',
  //   redirectTo: 'home'
  // };

  // $stateProvider.state(home);
  // $stateProvider.state(project);
  // $stateProvider.state(about);
  // $stateProvider.state(contacts);
  // $stateProvider.state(cms);
  // $stateProvider.state(reset);

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
      redirectTo: '/'
    })
    // .when('/', {
    //   redirectTo: '/home'
    // })
    .otherwise({
      redirectTo: '/home'
    });
}]);

require('./index');