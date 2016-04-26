angular.module('homepage').config(function($routeProvider) {
    $routeProvider.when('/data', {
        templateUrl: '/templates/projectsGrid/index.html'
    })
    .when('/', {
        templateUrl: '/templates/projectsGrid/index.html'
    })
    .otherwise({ redirectTo: '/' });
});