webpackJsonp([0],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var angular = __webpack_require__(0);

angular.module('architectureportfolio', ['ngRoute']).controller('portfolioCtrl', __webpack_require__(15));
angular.module('architectureportfolio', ['ngRoute']).controller('projectCtrl', __webpack_require__(16));
angular.module('architectureportfolio', ['ngRoute']).controller('contactsCtrl', __webpack_require__(14));

/***/ }),
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// import './../../public/sass/styles.scss';

var angular = __webpack_require__(0);

angular
.module('architectureportfolio', ['ngRoute','ngMaterial','ngMessages']) // 'ngAnimate','ngAria','ngMaterial','ngMessages'])
.config(['$routeProvider', function ($routeProvider) {
  // .config(['$routeProvider', '$locationProvider','$provide', function ($routeProvider,$locationProvider,$provide) {
    // $provide.decorator('$sniffer', ['$delegate', function($delegate) {
    //   $delegate.history = true;
    //   return $delegate;
    // }]);
    // $locationProvider
    //   .html5Mode(true);
  $routeProvider
    .when('/home', {
      // templateUrl: '../templates/portfolio.pug',
      templateUrl: '../templates/portfolio.pug',
      controller: 'PortfolioController'
      // controllerAs: 'controller'
    })
    .when('/reset', {
      redirectTo: '/home'
    })
    .when('/projects/:name', {
      templateUrl: '../templates/project.pug',
      controller: 'ProjectController'
    })
    .when('/about', {
      templateUrl: '../templates/about.pug'
    })
    .when('/contacts', {
      templateUrl: '../templates/contacts.pug',
      controller: 'ContactsController'
    })
    .otherwise({
      redirectTo: '/home'
    });
}]);

__webpack_require__(6);
// require('./directives');
// require('./services');

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function ContactsCtrl($scope, $http, $mdToast) {

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
};

module.exports = ContactsCtrl;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function PortfolioController($scope,$http) { // Projects
    
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

};

module.exports = PortfolioController;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function ProjectController($scope, $http, $routeParams) { // ProjectDetails

  $http.get('/projects/' + $routeParams.name).success(function(response) {
    // console.log('@projCtrl.js : successfully called http.get(/projects/' + $routeParams.name + ')');
    $scope.project = {};
    $scope.project = response;
  });

};

module.exports = ProjectController;

/***/ })
],[13]);