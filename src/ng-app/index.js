'use strict';

// Controllers 
angular.module('portfolio').controller('PortfolioController', require('./controllers/portfolioCtrl'));
angular.module('portfolio').controller('ProjectController', require('./controllers/projectCtrl'));
angular.module('portfolio').controller('ContactsController', require('./controllers/contactsCtrl'));
angular.module('portfolio').controller('CMSController', require('./controllers/cmsCtrl'));
angular.module('portfolio').controller('UploadController', require('./controllers/uploadCtrl'));

// Services
angular.module('portfolio').service('projectService', require('./services/projectService'));
angular.module('portfolio').service('uploadService', require('./services/uploadService'));

// Directives
angular.module('fileInputDirective').directive('fileInput', ['$parse', require('./directives/fileInputDirective')]);
