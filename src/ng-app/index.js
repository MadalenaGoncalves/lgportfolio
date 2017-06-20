'use strict';

// Controllers 
angular.module('architecturePortfolio').controller('PortfolioController', require('./controllers/portfolioCtrl'));
angular.module('architecturePortfolio').controller('ProjectController', require('./controllers/projectCtrl'));
angular.module('architecturePortfolio').controller('ContactsController', require('./controllers/contactsCtrl'));
angular.module('architecturePortfolio').controller('CMSController', require('./controllers/cmsCtrl'));

// Services
angular.module('architecturePortfolio').service('dataService', require('./services/dataService'));

// Directives
// angular.module('architecturePortfolio').directive('projectForm', require('./directives/projectFormDirective'));