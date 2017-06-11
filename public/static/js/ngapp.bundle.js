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


// Controllers 

angular.module('architectureportfolio').controller('PortfolioController', __webpack_require__(15));
angular.module('architectureportfolio').controller('ProjectController', __webpack_require__(16));
angular.module('architectureportfolio').controller('ContactsController', __webpack_require__(14));

// Services
angular.module('architectureportfolio').service('dataService', __webpack_require__(17));

// Directives

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


// import './styles.css';

var angular = __webpack_require__(0);

angular.module('architectureportfolio', ['ngRoute', 'ngMaterial', 'ngMessages']) // 'ngAnimate','ngAria','ngMaterial','ngMessages'])
.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $routeProvider.when('/home', {
    templateUrl: '/portfolio.html',
    controller: 'PortfolioController'
  }).when('/cms', {
    templateUrl: '/edit.html',
    controller: 'PortfolioController'
  }).when('/projects/:name', {
    templateUrl: '/project.html',
    controller: 'ProjectController'
  }).when('/about', {
    templateUrl: '/about.html'
  }).when('/contacts', {
    templateUrl: '/contacts.html',
    controller: 'ContactsController'
  }).when('/reset', {
    redirectTo: '/home'
  }).when('/', {
    redirectTo: '/home'
  }).otherwise({
    redirectTo: '/home'
  });
}]);

__webpack_require__(6);

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function ContactsController($scope, $http, $mdToast) {

  $scope.submit = function () {
    var data = {
      name: this.name,
      email: this.email,
      message: this.message
    };

    // console.log(JSON.stringify(data));

    $http.post('/contacts', data).success(function (data, status, headers, config) {
      $mdToast.show($mdToast.simple().content('Thanks for your message ' + data.name + '!').position('top right').hideDelay(5000));
    }).error(function (data, status, headers, config) {
      $scope.ResponseDetails = "Data: " + data + "<hr />status: " + status + "<hr />headers: " + header + "<hr />config: " + config;
    });
  };
};

module.exports = ContactsController;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function PortfolioController($scope, $http, dataService) {

  dataService.getPortfolio(function (response) {
    console.log('@portfolioCtrl:dataService.getPortfolio()');
    $scope.projects = {};
    $scope.projects = response.data;
  });

  // $scope.reset = function() {
  //   $http.get('/reset').then(function(response){
  //     console.log('@PortfolioCtrl: GET /reset');
  //     $scope.projects = {};
  //     $scope.projects = response.data;
  //   });
  // };

  // $http.get('/cms').then(function(){
  //   console.log('@PortfolioCtrl: GET /cms');
  //   $scope.projects = {};
  //   $scope.projects = response.data;
  // });

  // $http.post('/cms').then(function(){
  //   console.log('@PortfolioCtrl /cms');
  //   $scope.projects = {};
  //   $scope.projects = response.data;
  // });
};

module.exports = PortfolioController;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function ProjectController($scope, $http, $routeParams, dataService) {
  dataService.getProject(function (response) {
    console.log('@ProjectCtrl:getProject');
    $scope.project = {};
    $scope.project = response.data;
  });
};

module.exports = ProjectController;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function dataService($http, $routeParams) {

  this.getPortfolio = function (callback) {
    console.log('@dataService:getPortfolio: get(/home).then(callback)');
    $http.get('/home').then(callback);
  };

  this.getProject = function (callback) {
    console.log('@dataService:getProject - name: ' + $routeParams.name);
    $http.get('/projects/' + $routeParams.name).then(callback);
  };

  this.saveProject = function (callback) {
    console.log('@dataService:saveProject');
    console.log('Project saved');
  };

  this.deleteProject = function (callback) {
    console.log('@dataService:deleteProject');
    console.log('Project deleted');
  };
}
module.exports = dataService;

/***/ })
],[13]);