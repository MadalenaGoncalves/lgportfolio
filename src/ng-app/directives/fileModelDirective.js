'use strict';

function fileModel($parse) {
  return {
    restrict: 'A', // attribute  E-element, A-Attribute, C-Class, M-Comments
    //scope: {},  // isolated scopes: 
            // in "scope: { customerInfo: '=info' }" 
            //  info - Attr in the html directive. In the Ctrl, binds to our scope object (ex: $scope.naomi = {name:'Naomi'} )
            //  customerInfo - In html, allows us to access the object of the scope (ex: {{customerInto.name}} )
            // in "scope: { close: '&onClose' }" used to expose an API for binding to behaviors
    link: function(scope, element, attrs) { // link is to manipulate the DOM
            var parsedFile = $parse(attrs.fileModel); // element, in this case is the "input" html element, and "file-model" is one of its attributes
            var parsedFileSetter = parsedFile.assign;

            element.bind('change', function() {
              scope.$apply(function() {
                parsedFileSetter(scope, element[0].files[0]);
              });
            });
          }
  };
}

module.exports = fileModel;