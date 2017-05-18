app.controller("PortfolioController", function($scope,$http) { // Projects
    $http.get("/home").success(function(response) {
        $scope.projects = {};
        $scope.projects = response;
    });
    
    $scope.reset = function() {
        $http.get("/reset").success(function(response){
            $scope.projects = {};
            $scope.projects = response;
        });
    }
});