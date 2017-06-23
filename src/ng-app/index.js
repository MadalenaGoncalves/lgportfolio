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
// angular.module('portfolio').directive('projectForm', require('./directives/projectFormDirective'));
// angular.module('portfolio').directive('fileModel', require('./directives/fileModelDirective'));
angular.module('fileModelDirective').directive('fileModel', ['$parse', require('./directives/fileModelDirective')]);
