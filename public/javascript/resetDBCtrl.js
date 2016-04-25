app.controller('ResetDBController', function($scope,$http) {    
    $scope.reset = function() {
        $http.get("/reset").success(function(response){
            // $route.reload();
            console.log("resetDBCtrl end");
        });
    }
});