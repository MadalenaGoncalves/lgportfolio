app.controller("pController", function ($scope, $http, $routeParams) {
  $scope.name = $routeParams.name;
  console.log("scope: " + $scope.name);
  
  $http.get("/p/"+$scope.name).success(function (response) {
    $scope.images = response;
    console.log("scope2 OK");
  });
});