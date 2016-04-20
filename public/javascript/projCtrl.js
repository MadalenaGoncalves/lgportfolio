app.controller("ProjectController", function($scope,$http) {
    // this.projects = Project.find({}, "_id name shortTitle shortDesc");
    $http.get("/data").success(function(response) {
        $scope.projects = response;
    });
});