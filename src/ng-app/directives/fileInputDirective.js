'use strict';

function fileInput($parse) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      
      // Parse the file
      var parsedFile = $parse(attrs.fileInput);
      var parsedFileSetter = parsedFile.assign;

      // Update the scope with the parsed file
      element.bind('change', function() {
        scope.$apply(function(){
          parsedFileSetter(scope, element[0].files);  // check just the first file
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