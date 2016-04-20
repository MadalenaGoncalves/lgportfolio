// var resetdb = require('./db/data/dbReset.js');
// resetdb.resetDB();

// var mongoose = require( 'mongoose' );
// require( './models/projects.js' );
// var Project = mongoose.model( 'Projects' );

// wrapping your js in a closure is a good habit! (function(){ ... })()
// (function(){
    // var app = angular.module('homepage',['ui.router']);
    var app = angular.module('homepage',[ ]);
      // declaring the app variable avoids poluting the global namespace since every object we 
      //   create (variable, function, etc), is going to be local to this "app" variable
//    app.controller('ProjectController', function() {
//        // initializes product which creates a product atribute in the controller
//        this.projects = Project.find({}, "_id name shortTitle shortDesc"); 
//    });
// })();