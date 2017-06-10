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

// call an instance of an angular module
// angular.module('architectureportfolio', ['ngRoute']).controller('portfolioCtrl', require('./portfolioCtrl'));
// angular.module('architectureportfolio', ['ngRoute']).controller('projectCtrl', require('./projectCtrl'));
// angular.module('architectureportfolio', ['ngRoute']).controller('contactsCtrl', require('./contactsCtrl'));

angular.module('architectureportfolio').controller('portfolioCtrl', __webpack_require__(15));

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var angular = __webpack_require__(0);

angular.module('architectureportfolio').service('dataService', __webpack_require__(16));

/***/ }),
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// import './../../public/sass/styles.scss';

var angular = __webpack_require__(0);

angular.module('architectureportfolio', []);
// angular
// // create an angular module
// .module('architectureportfolio', ['ngRoute'])//,'ngMaterial','ngMessages']) // 'ngAnimate','ngAria','ngMaterial','ngMessages'])
// .config(['$routeProvider', function ($routeProvider) {
//   // .config(['$routeProvider', '$locationProvider','$provide', function ($routeProvider,$locationProvider,$provide) {
//     // $provide.decorator('$sniffer', ['$delegate', function($delegate) {
//     //   $delegate.history = true;
//     //   return $delegate;
//     // }]);
//     // $locationProvider
//     //   .html5Mode(true);
//   $routeProvider
//     .when('/home', {
//       templateUrl: '../../public/templates/portfolio.html',
//       // controller: 'PortfolioController'
//       // controllerAs: 'controller'
//     })
//     .when('/reset', {
//       redirectTo: '/home'
//     })
//     .when('/projects/:name', {
//       templateUrl: '../../public/templates/project.html',
//       controller: 'ProjectController'
//     })
//     .when('/about', {
//       templateUrl: '../../public/templates/about.html'
//     })
//     .when('/contacts', {
//       templateUrl: '../../public/templates/contacts.html',
//       controller: 'ContactsController'
//     })
//     .otherwise({
//       redirectTo: '/home'
//     });
// }]);

__webpack_require__(6);
// require('./directives');
__webpack_require__(7);

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function PortfolioController($scope, $http, dataService) {

  // $http.get("/home").success(function(response) {
  $http.get("/").then(function (response) {
    console.log("@portfolioCtrl /home");
    $scope.projects = {};
    $scope.projects = response;
  });

  $scope.reset = function () {
    $http.get("/reset").then(function (response) {
      $scope.projects = {};
      $scope.projects = response;
    });
  };

  $scope.helloWorld = dataService.helloWorld;

  // dataService.getPortfolio( function(response) {
  //   console.log(response.data);
  //   $scope.projects = {};
  //   $scope.projects = response.data;
  // });

};

module.exports = PortfolioController;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function dataService($http) {

  this.helloWorld = function () {
    console.log('This is  the dataService method!');
  };

  // this.getPortfolio = function(callback) {
  //   $http.get('mock/projects.json')
  //   .then(callback);
  // };

  // this.getProject = function(proj) {
  //   console.log('Project retrieved');
  // };
  // this.saveProject = function(proj) {
  //   console.log('Project saved');
  // };
  // this.deleteProject = function(proj) {
  //   console.log('Project deleted');
  // };
}
module.exports = dataService;

/***/ })
],[14]);