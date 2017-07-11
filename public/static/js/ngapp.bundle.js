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
angular.module('portfolio').service('projectService', __webpack_require__(20));
angular.module('portfolio').service('uploadService', __webpack_require__(21));

// Directives
angular.module('fileInputDirective').directive('fileInput', ['$parse', __webpack_require__(19)]);

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
angular.module('fileInputDirective', []);

// main module
angular.module('portfolio', ['ngRoute', 'ngMaterial', 'ngMessages', 'fileInputDirective']) // 'ngAnimate','ngAria','ngMaterial','ngMessages'])
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


function CMSController($scope, $http, $timeout, projectService, uploadService) {

  var _this = this;

  // Initialize validation variables
  _this.adding = false;
  _this.editing = false;
  _this.thumbnailChanged = false;
  _this.imagesChanged = false;
  _this.blockForm = false;
  _this.file = {};
  _this.alert = '';

  // Populate the projects variable on page load
  projectService.getAllFull(function (response) {
    console.log('@cmsCtrl:projectService.getAllFull()');
    _this.projects = {};
    _this.projects = response.data;
  });

  // Year values to populate select elements
  var year = new Date().getFullYear();
  _this.years = [];
  for (var i = 2004; i <= 2030; i++) {
    _this.years.push(i);
  }

  // ############################################
  // ### Toggle editor ##########################
  // ############################################
  this.toggleForm = function (proj) {
    console.log('@cmsCtrl: toggleForm() ');
    if ("undefined" === typeof proj) {
      _this.project = {};
      _this.editing = false;
      _this.adding = true;
    } else if (!_this.editing || proj._id != _this.project._id) {
      _this.project = {};
      _this.project = proj;
      _this.adding = false;
      _this.editing = true;
    } else {
      _this.editing = false;
      _this.project = {};
    }
  };

  this.cancel = function () {
    _this.adding = false;
    _this.editing = false;
    _this.project = {};
    _this.thumbnailUrl = '';
    _this.thumbnailChanged = false;
  };

  // ############################################
  // ### Watch thumbnail changes ################
  // ############################################
  $scope.thumbnailChanged = function (files) {
    if (files.length > 0 && files[0].name.match(/\.(png|jpeg|jpg|gif)$/i)) {

      var file = files[0];
      var fileReader = new FileReader();
      console.log("File name:" + file.name);

      fileReader.onload = function (e) {
        $timeout(function () {
          _this.thumbnailUrl = '';
          _this.thumbnailUrl = e.target.result;
        });
      };

      fileReader.readAsDataURL(file);
      _this.thumbnailChanged = true;
    } else {
      _this.thumbnailUrl = '';
      _this.thumbnailChanged = false;
    }
  };

  // ############################################
  // ### Form submit ############################
  // ############################################
  this.submit = function (proj) {
    console.log('@cmsCtrl: submit() ');

    _this.inProgress = true;

    projectService.upsert({ proj: proj }, function (response) {
      console.log('@cmsCtrl:projectService.upsert()');
      if ("undefined" === typeof proj._id) {
        _this.projects.push(response.data);
        _this.adding = false;
      } else {
        _this.editing = false;
      }
      _this.project = {};
    });

    console.log("projectID : ?");

    // if(_this.thumbnailChanged) {
    //   console.log('change thumbnail here');
    // }

    // if(_this.imagesChanged) {
    //   console.log('change images here');
    // }
  };
  _this.submitThumbnail = function () {
    _this.uploadingThumb = true;
    uploadService.uploadThumbnail(_this.file[0]).then(function (data) {
      if (data.data.success) {
        _this.alert = 'alert alert-success'; // this is just for the ng-class
        _this.file = {};
      } else {
        _this.alert = 'alert alert-danger';
        _this.file = {};
      }
    });
  };

  // ############################################
  // ### Delete project #########################
  // ############################################
  this.delete = function (idx) {
    console.log('@cmsCtrl: delete()');

    // ToDo: alert box to confirm action

    var proj = _this.projects[idx];
    // ToDo: delete thumbnail
    // Todo: delete images
    projectService.delete({ id: proj._id }, function (response) {
      console.log('@projectService.delete()');
      _this.projects.splice(idx, 1);
    });
  };

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
  var _this = this;
  var defaultThumbnailUrl = '/thumbnails/default.png';

  _this.thumbnailUrl = defaultThumbnailUrl;
  _this.file = {};
  _this.alert = '';

  _this.submitThumbnail = function () {
    _this.uploadingThumb = true;
    uploadService.uploadThumbnail(_this.file[0]).then(function (data) {
      if (data.data.success) {
        _this.uploadingThumb = false;
        _this.alert = 'alert alert-success'; // this is just for the ng-class
        _this.file = {};
      } else {
        _this.uploadingThumb = false;
        _this.alert = 'alert alert-danger';
        _this.file = {};
      }
    });
  };

  $scope.thumbnailChanged = function (files) {
    if (files.length > 0 && files[0].name.match(/\.(png|jpeg|jpg|gif)$/i)) {
      _this.uploadingThumb = true;

      var file = files[0];
      var fileReader = new FileReader();
      console.log("File name:" + file.name);

      fileReader.onload = function (e) {
        $timeout(function () {
          _this.thumbnailUrl = {};
          _this.thumbnailUrl = e.target.result;
          _this.uploadingThumb = false;
        });
      };

      fileReader.readAsDataURL(file);
    } else {
      _this.thumbnailUrl = {};
    }
  };

  //   _this.cancelThumbnailUpload = function() {
  //     // _this.thumbnailUrl = {};
  //     _this.file = {};
  //     _this.uploadingThumb = false;
  //   }
};

module.exports = uploadController;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function fileInput($parse) {
  return {
    restrict: 'A',
    link: function link(scope, element, attrs) {

      // Parse the file
      var parsedFile = $parse(attrs.fileInput);
      var parsedFileSetter = parsedFile.assign;

      // Update the scope with the parsed file
      element.bind('change', function () {
        scope.$apply(function () {
          parsedFileSetter(scope, element[0].files); // check just the first file
        });
      });
    }
  };
}

// restrict: A-attribute  E-element, C-Class, M-Comments
// link: used to manipulate the DOM - element, in this case is the "input" html element, and "file-model" is one of its attributes
//scope: {},  // isolated scopes: 
// in "scope: { customerInfo: '=info' }" 
//  info - Attr in the html directive. In the Ctrl, binds to our scope object (ex: $scope.naomi = {name:'Naomi'} )
//  customerInfo - In html, allows us to access the object of the scope (ex: {{customerInto.name}} )
// in "scope: { close: '&onClose' }" used to expose an API for binding to behaviors

module.exports = fileInput;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function projectService($http, $routeParams) {

  this.getAll = function (callback) {
    console.log('@projectService:getAll: get(/home).then(callback)');
    $http.get('/home').then(callback);
  };

  this.getAllFull = function (callback) {
    console.log('@projectService:getAllFull: get(/cms).then(callback)');
    $http.get('/cms').then(callback);
  };

  this.getOne = function (callback) {
    console.log('@projectService:getOne - id: ' + $routeParams.id);
    $http.get('/projects/' + $routeParams.id).then(callback);
  };

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
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function uploadService($http, $routeParams) {

  this.uploadThumbnail = function (file) {
    console.log('@uploadService.js: uploadThumbnail()');

    var fd = new FormData();
    fd.append('thumbnail', file); // 'thumbnail' has to be the fieldname of the html input

    return $http.post('/upload/thumbnail', fd, {
      transformRequest: angular.identity,
      headers: { 'Content-Type': undefined }
    });
  };

  this.uploadImages = function (files) {
    console.log('@uploadService.js: uploadImages()');

    var fd = new FormData();
    angular.forEach(files, function (file) {
      fd.append('file', file);
    });

    return $http.post('/upload/images', fd, {
      transformRequest: angular.identity,
      headers: { 'Content-Type': undefined }
    });
  };
}

module.exports = uploadService;

/***/ })
],[13]);