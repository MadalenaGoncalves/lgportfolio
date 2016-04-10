var resetdb = require('./data/dbReset.js');
resetdb.resetDB() ;
// // wrapping your js in a closure is a good habit! (function(){ ... })()

// // (function(){
//     // var app = angular.module('db',['ui.router']);
//     var app = angular.module('db',[ ]); 
//       // declaring the app variable avoids poluting the global namespace since every object we 
//       //   create (variable, function, etc), is going to be local to this "app" variable
//     app.controller('ProjectController', function() {
//         this.projects = projList; // initializes product which creates a product atribute in the controller
//     });
    
//     var projList = [
//         {
//             id: 'proj1',
//             shortTitle: 'Short Title1',
//             shortDesc: 'Short description1',
//         },
//         {
//             id: 'proj2',
//             shortTitle: 'Short Title2',
//             shortDesc: 'Short description2',
//         }
//     ];
// // })();