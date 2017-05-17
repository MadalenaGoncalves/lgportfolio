app.controller('ContactsController', function ($scope, $http, $mdToast) {

  $scope.submit = function () {
    var data = ({
      name: this.name,
      email: this.email,
      message: this.message
    });

    // console.log(JSON.stringify(data));

    $http.post('/contacts', data)
      .success(function (data, status, headers, config) {
        $mdToast.show(
          $mdToast.simple()
            .content('Thanks for your message ' + data.name + '!')
            .position('top right')
            .hideDelay(5000)
        )
      })
      .error(function (data, status, headers, config) {
        $scope.ResponseDetails = "Data: " + data +
            "<hr />status: " + status +
            "<hr />headers: " + header +
            "<hr />config: " + config;
      });
  }
});
