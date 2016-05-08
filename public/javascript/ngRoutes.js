angular.module('homepage').config(function($routeProvider) {
    $routeProvider
    .when('/data', {
        templateUrl: '/templates/project-grid/index.html'
    })
    .when('/', {
        templateUrl: '/templates/project-grid/index.html'
    })
    .otherwise({ redirectTo: '/' });
});