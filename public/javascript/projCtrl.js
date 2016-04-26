app.controller("ProjectController", function($scope,$http,$route) {
    $http.get("/data").success(function(response) {
        $scope.projects = response;
    });
    
    $scope.reset = function() {
        $http.get("/reset").success(function(response){
            $route.reload();
        });
    }
});