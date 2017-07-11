'use strict';

app.directive('yearSelect',function(){
  var currentYear = new Date().getFullYear();
  return {
    restrict: 'AE',
    replace: true,
    scope:{   },
    template: '<select ng-options="y for y in years"></select>',
    controller: ["$scope", "$element", "$attrs", function (scope, element, attrs) {
      scope.years = [];
      for (var i = (attrs.offset*1); i < (attrs.range*1) + 1; i++){
      scope.years.push(currentYear + i);
    }
    // $scope.selected = moment().year();
    }]
  }
});