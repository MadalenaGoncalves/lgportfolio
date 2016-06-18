app.controller("ProjectController", function ($scope, $http, $routeParams) { // ProjectDetails
    $http.get('/projects/' + $routeParams.name).success(function(response) {
      console.log('@projCtrl.js : successfully called http.get(/projects/' + $routeParams.name + ')');
      $scope.project = {};
      $scope.project = response;
    });
});