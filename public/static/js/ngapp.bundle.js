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

angular.module('portfolio').controller('PortfolioController', __webpack_require__(16));
angular.module('portfolio').controller('ProjectController', __webpack_require__(17));
angular.module('portfolio').controller('ContactsController', __webpack_require__(15));
angular.module('portfolio').controller('CMSController', __webpack_require__(14));
angular.module('portfolio').controller('UploadController', __webpack_require__(18));

// Services
angular.module('portfolio').service('projectService', __webpack_require__(19));
angular.module('portfolio').service('uploadService', __webpack_require__(20));

// Directives
// angular.module('portfolio').directive('projectForm', require('./directives/projectFormDirective'));
// angular.module('portfolio').directive('fileModel', require('./directives/fileModelDirective'));
angular.module('fileModelDirective').directive('fileModel', ['$parse', __webpack_require__(22)]);

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

// file upload module
angular.module('fileModelDirective', []);

// main module
angular.module('portfolio', ['ngRoute', 'ngMaterial', 'ngMessages', 'fileModelDirective']) // 'ngAnimate','ngAria','ngMaterial','ngMessages'])
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


function CMSController($http, projectService) {

  var _this = this;
  _this.projects;
  _this.formProject = {};

  // Populate the projects variable on page load
  projectService.getAll(function (response) {
    console.log('@cmsCtrl:projectService.getAll()');
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
    console.log('@cmsCtrl:projectService.reset()');
    projectService.reset(function (response) {
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
      _this.editing = false;
      _this.adding = true;
    } else if (!_this.editing || proj._id != _this.formProject._id) {
      _this.formProject = {};
      _this.formProject = proj;
      _this.adding = false;
      _this.editing = true;
    } else {
      _this.editing = false;
      _this.formProject = {};
    }
  };

  this.cancel = function () {
    _this.adding = false;
    _this.editing = false;
    _this.formProject = {};
  };

  this.submit = function (proj) {
    console.log('@cmsCtrl: submit() ');

    projectService.upsert({ proj: proj }, function (response) {
      console.log('@cmsCtrl:projectService.upsert()');
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
    projectService.delete({ id: proj._id }, function (response) {
      console.log('@projectService.delete()');
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


function PortfolioController($scope, $http, projectService) {
  projectService.getAll(function (response) {
    console.log('@portfolioCtrl:projectService.getAll()');
    $scope.projects = {};
    $scope.projects = response.data;
  });
};

module.exports = PortfolioController;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function ProjectController($scope, $http, $routeParams, projectService) {
  projectService.getOne(function (response) {
    console.log('@ProjectCtrl:getOne');
    $scope.project = {};
    $scope.project = response.data;
  });
};

module.exports = ProjectController;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function uploadController($scope, $timeout, uploadService) {
  $scope.file = {};
  $scope.thumbnailMessage = false;
  $scope.alert = '';

  $scope.submitThumbnail = function () {
    $scope.uploadingThumb = true;

    uploadService.uploadThumbnail($scope.file).then(function (data) {
      if (data.data.success) {
        $scope.uploadingThumb = false;
        $scope.alert = 'alert alert-success'; // this is just for the ng-class
        $scope.thumbnailMessage = data.data.message;
        $scope.file = {};
      } else {
        $scope.uploadingThumb = false;
        $scope.alert = 'alert alert-danger';
        $scope.thumbnailMessage = data.data.message;
        $scope.file = {};
      }
    });
  };

  $scope.thumbnailChanged = function (files) {
    if (files.length > 0 && files[0].name.match(/\.(png|jpeg|jpg)$/i)) {
      $scope.uploadingThumb = true;
      var file = files[0];
      var fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = function (e) {
        $timeout(function () {
          $scope.thumbnail = {};
          $scope.thumbnail.dataUrl = e.target.result;
          $scope.uploadingThumb = false;
          $scope.thumbnailMessage = false;
        });
      };
    } else {
      $scope.thumbnail = {};
      $scope.thumbnailMessage = false;
    }
  };

  $scope.cancelThumbnailUpload = function () {
    $scope.thumbnail = {};
    $scope.file = {};
    $scope.uploadingThumb = false;
    $scope.thumbnailMessage = false;
  };
};

module.exports = uploadController;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function projectService($http, $routeParams) {

  this.getAll = function (callback) {
    console.log('@projectService:getAll: get(/home).then(callback)');
    $http.get('/home').then(callback);
  };

  this.getOne = function (callback) {
    console.log('@projectService:getOne - id: ' + $routeParams.id);
    console.log($routeParams);
    $http.get('/projects/' + $routeParams.id).then(callback);
  };

  // this.addProject = function(proj, callback) {
  //   console.log('@projectService:addProject');
  //   $http.post('/cms',proj).then(callback);
  // };

  // this.updateProject = function(data, callback) {
  //   console.log('@projectService:updateProject - id: ' + data.id);
  //   $http.post('/cms/' + data.id, data.proj).then(callback);
  // };

  this.upsert = function (data, callback) {
    console.log('@projectService:upsert - id: ' + data.proj._id);
    $http.post("/cms", data.proj).then(callback);
  };

  this.delete = function (proj, callback) {
    console.log('@projectService:delete - id: ' + proj.id);
    $http.delete('/cms/' + proj.id).then(callback);
  };

  this.reset = function (callback) {
    console.log('@projectService:reset');
    $http.get('/reset').then(callback);
  };
}

module.exports = projectService;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function uploadService($http, $routeParams) {

  this.uploadThumbnail = function (file) {
    console.log('@uploadService.js: uploadThumbnail()');

    var fd = new FormData();
    fd.append('projThumbnail', file.upload); // this 'projThumbnail' name has to be the same in the html

    return $http.post('/uploadthumbnail', fd, {
      transformRequest: angular.identity,
      headers: { 'Content-Type': undefined }
    });
  };
}

module.exports = uploadService;

/***/ }),
/* 21 */,
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function fileModel($parse) {
  return {
    restrict: 'A', // attribute  E-element, A-Attribute, C-Class, M-Comments
    //scope: {},  // isolated scopes: 
    // in "scope: { customerInfo: '=info' }" 
    //  info - Attr in the html directive. In the Ctrl, binds to our scope object (ex: $scope.naomi = {name:'Naomi'} )
    //  customerInfo - In html, allows us to access the object of the scope (ex: {{customerInto.name}} )
    // in "scope: { close: '&onClose' }" used to expose an API for binding to behaviors
    link: function link(scope, element, attrs) {
      // link is to manipulate the DOM
      var parsedFile = $parse(attrs.fileModel); // element, in this case is the "input" html element, and "file-model" is one of its attributes
      var parsedFileSetter = parsedFile.assign;

      element.bind('change', function () {
        scope.$apply(function () {
          parsedFileSetter(scope, element[0].files[0]);
        });
      });
    }
  };
}

module.exports = fileModel;

/***/ })
],[13]);