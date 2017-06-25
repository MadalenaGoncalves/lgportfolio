'use strict';

function fileModel($parse) {
// function fileInput($parse) {
  return {
    restrict: 'A', // attribute  E-element, A-Attribute, C-Class, M-Comments
    link: function(scope, element, attrs) { // link is to manipulate the DOM - element, in this case is the "input" html element, and "file-model" is one of its attributes
      element.bind('change', function() {
        $parse(attrs.fileModel).assign(scope, element[0].files[0]);
        // $parse(attrs.fileInput).assign(scope, element[0].files);
        scope.$apply();
      }); 
    }
    //scope: {},  // isolated scopes: 
    // in "scope: { customerInfo: '=info' }" 
    //  info - Attr in the html directive. In the Ctrl, binds to our scope object (ex: $scope.naomi = {name:'Naomi'} )
    //  customerInfo - In html, allows us to access the object of the scope (ex: {{customerInto.name}} )
    // in "scope: { close: '&onClose' }" used to expose an API for binding to behaviors
  };
}

module.exports = fileModel;
// module.exports = fileInput;