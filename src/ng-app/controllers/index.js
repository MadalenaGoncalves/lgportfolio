'use strict';

var angular = require('angular');

angular.module('architectureportfolio', ['ngRoute']).controller('portfolioCtrl', require('./portfolioCtrl'));
angular.module('architectureportfolio', ['ngRoute']).controller('projectCtrl', require('./projectCtrl'));
angular.module('architectureportfolio', ['ngRoute']).controller('contactsCtrl', require('./contactsCtrl'));