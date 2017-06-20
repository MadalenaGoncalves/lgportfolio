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

angular.module('architecturePortfolio').controller('PortfolioController', __webpack_require__(16));
angular.module('architecturePortfolio').controller('ProjectController', __webpack_require__(17));
angular.module('architecturePortfolio').controller('ContactsController', __webpack_require__(15));
angular.module('architecturePortfolio').controller('CMSController', __webpack_require__(14));

// Services
angular.module('architecturePortfolio').service('dataService', __webpack_require__(18));

// Directives
// angular.module('architecturePortfolio').directive('projectForm', require('./directives/projectFormDirective'));

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

angular.module('architecturePortfolio', ['ngRoute', 'ngMaterial', 'ngMessages']) // 'ngAnimate','ngAria','ngMaterial','ngMessages'])
.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $routeProvider.when('/home', {
    // redirectTo: '/cms'
    templateUrl: '/portfolio.html',
    controller: 'PortfolioController',
    controllerAs: 'portfolioCtrl'
  }).when('/cms', {
    templateUrl: '/cms.html',
    controller: 'CMSController',
    controllerAs: 'cmsCtrl'
  }).when('/projects/:id', {
    templateUrl: '/project.html',
    controller: 'ProjectController',
    controllerAs: 'projectCtrl'
  }).when('/about', {
    templateUrl: '/about.html'
  }).when('/contacts', {
    templateUrl: '/contacts.html',
    controller: 'ContactsController',
    controllerAs: 'contactsCtrl'
  }).when('/reset', {
    redirectTo: '/cms'
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


function CMSController($scope, $http, dataService) {

  var _this = this;
  _this.projects;
  _this.formProject;

  // Populate the projects variable on page load
  dataService.getPortfolio(function (response) {
    console.log('@cmsCtrl:dataService.getPortfolio()');
    _this.projects = {};
    _this.projects = response.data;
  });

  // ############################################
  // ### Front-end validation variables #########
  // ############################################
  _this.adding = false;
  _this.editing = false;

  // Year values to populate select elements
  var year = new Date().getFullYear();
  _this.years = [];
  for (var i = 2004; i <= 2030; i++) {
    _this.years.push(i);
  }

  // ############################################
  // ### Reset DB ###############################
  // ############################################
  this.reset = function () {
    console.log('@cmsCtrl:dataService.reset()');
    dataService.reset(function (response) {
      _this.projects = {};
      _this.projects = response.data;
    });
  };

  // ############################################
  // ### Add/Edit project #######################
  // ############################################
  this.showForm = function (proj) {
    console.log('@cmsCtrl: showForm() ');
    if ("undefined" === typeof proj) {
      _this.formProject = {};
      _this.adding = !this.adding;
      _this.editing = false;
    } else {
      _this.formProject = proj;
      _this.editing = !this.editing;
      _this.adding = false;
    }
  };

  this.cancel = function () {
    _this.adding = !this.adding;
    _this.formProject = {};
  };

  this.submit = function (proj) {
    console.log('@cmsCtrl: submit() ');
    console.log(proj);
    // if ("undefined" === typeof proj._id) {
    //   dataService.addProject({proj: proj}, function(response) {
    //     console.log('@cmsCtrl:dataService.addProject()');
    //     _this.projects.push(response.data);
    //     _this.formProject = {};
    //     _this.adding = false;
    //   });
    // }
    // else {
    //   dataService.updateProject({id: proj._id, proj: proj}, function(response) {
    //     console.log('@cmsCtrl:dataService.updateProject()');
    //     // _this.projects.push(response.data);
    //     _this.formProject = {};
    //     _this.editing = false;
    //   });
    // }

    dataService.upsertProject({ proj: proj }, function (response) {
      console.log('@cmsCtrl:dataService.upsert()');
      if ("undefined" === typeof proj._id) {
        _this.projects.push(response.data);
        _this.adding = false;
      } else {
        _this.editing = false;
      }
      _this.formProject = {};
    });
  };

  // ############################################
  // ### Delete project #########################
  // ############################################
  this.delete = function (idx) {
    console.log('@cmsCtrl: delete()');
    var proj = _this.projects[idx];
    dataService.deleteProject({ id: proj._id }, function (response) {
      console.log('@dataService.deleteProject callback');
      _this.projects.splice(idx, 1);
    });
  };

  // this.initProject = function() {
  //   return {
  //     // "name": "",
  //     // "category": "",
  //     // "description": "",
  //     // "address": "",
  //     // "city": "",
  //     // "country": "",
  //     // "start": "",
  //     // "end": "",
  //     // "grossarea": 0.00,
  //     // "floorarea": 0.00,
  //     // "company": "",
  //     // "participation": "",
  //     // "images": []
  //   }
  // };
};

module.exports = CMSController;

/***/ }),
/* 15 */
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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function PortfolioController($scope, $http, dataService) {
  dataService.getPortfolio(function (response) {
    console.log('@portfolioCtrl:dataService.getPortfolio()');
    $scope.projects = {};
    $scope.projects = response.data;
  });
};

module.exports = PortfolioController;

/***/ }),
/* 17 */
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
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function dataService($http, $routeParams) {

  this.getPortfolio = function (callback) {
    console.log('@dataService:getPortfolio: get(/home).then(callback)');
    $http.get('/home').then(callback);
  };

  this.getProject = function (callback) {
    console.log('@dataService:getProject - id: ' + $routeParams.id);
    console.log($routeParams);
    $http.get('/projects/' + $routeParams.id).then(callback);
  };

  // this.addProject = function(proj, callback) {
  //   console.log('@dataService:addProject');
  //   $http.post('/cms',proj).then(callback);
  // };

  // this.updateProject = function(data, callback) {
  //   console.log('@dataService:updateProject - id: ' + data.id);
  //   $http.post('/cms/' + data.id, data.proj).then(callback);
  // };

  this.upsertProject = function (data, callback) {
    console.log('@dataService:upsert - id: ' + data.proj._id);
    $http.post("/cms", data.proj).then(callback);
  };

  this.deleteProject = function (proj, callback) {
    console.log('@dataService:deleteProject - id: ' + proj.id);
    $http.delete('/cms/' + proj.id).then(callback);
  };

  this.reset = function (callback) {
    console.log('@dataService:reset');
    $http.get('/reset').then(callback);
  };
}

module.exports = dataService;

/***/ })
],[13]);