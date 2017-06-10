'use strict';

// Controllers 
angular.module('architectureportfolio').controller('PortfolioController', require('./controllers/portfolioCtrl'));
angular.module('architectureportfolio').controller('ProjectController', require('./controllers/projectCtrl'));
angular.module('architectureportfolio').controller('ContactsController', require('./controllers/contactsCtrl'));

// Services
angular.module('architectureportfolio').service('dataService', require('./services/dataService'));

// Directives