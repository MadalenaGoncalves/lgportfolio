var async = require('async');
var mongoose = require( 'mongoose' ),
    imgModel = require( './../models/images.js' ),
    projModel = require( './../models/projects.js' ),
    projectsData = require( './projects.json' ),
    imagesData = require( './images.json' ),
    mapperData = require( './projImgMapper.json' );

// get refs to the models we defined above
var Image = mongoose.model( 'Images' );
var Project = mongoose.model( 'Projects' );

// var insertColl = function(modelName){
//     assert.ok(modelInst instanceof mongoose.Schema.Types.String);
//     for( var i = 0; i < collData.length; i++ ) {
//         var auxModel = new Image( collData[ i ] );
//         auxModel.save(function(err,img){
//             if(err) console.error(err);
//             console.log("Added record'" + img.name + "'");
//         });
//     }
// };
var clearAllColls = function(callback){
    Image.remove({}, function(callback){ 
        if(err) return callback(err);
        
        console.log("Deleted all documents from Images");
        // Project.remove({}, function(callback){
        //     if(err) return callback(err); 
            
        //     console.log("Deleted all documents from Projects");
            callback();
        // });
    });
}
var populateImages = function(callback){
    // populate the Images collection from json data
    async.forEach(imagesData, function(img){
        new Image(img).save(function(err,img){
            if(err) return callback(err);
            console.log("Added image: '" + img.name + "'");
        });
    }, function(err) {
        if (err) return next(err);
        callback();
    });
};
// var populateImages = function(callback){
//     // populate the Images collection from json data
//     for( var i = 0; i < imagesData.length; i++ ) {
//         new Image( imagesData[ i ] ).save(function(err,img){
//             if(err) return callback(err);
//             console.log("Added image: '" +aimg.name + "'");
//         });
//     }
//     callback();
// };
var populateProjects = function(callback){
    // populate the Projects collection from json data
    for( var i = 0; i < projectsData.length; i++ ) {
        new Project( projectsData[ i ] ).save(function(err,proj){
            if(err) console.error(err);
            console.log("Added project: '" + proj.name + "'");
        });
    }
    callback();
};
// var mappColl = function(callback){
//     // Map images to projects
//     for( var i = 0; i < mapperData.length; i++ ) {
//         var proj = Project.find({ name : mapperData[i].project } )
//         for (var j=0; j<mapperData[i].images; j++){
//             var img = Image.find({ name : mapperData[i].images[j] } );
//             proj.images.push(img._id).save();
//         }
//         proj.populate("images").exec(function(err,proj){
//             if(err) return callback(err);
//             console.log("Project '" + proj.name + "' populated with images array.");
//         });
//     }
//     callback();
// }

var resetDB = function() {
    mongoose.connect('mongodb://localhost/lgportfoliodb');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        // console.log( typeof callback === 'function')
        async.series(
            [
                function(callback){
                    Image.remove({}, function(){ 
                        if(err) return callback(err);
                        console.log("Deleted all documents from Images");
                        callback();
                    });
                },
                function(callback){
                    Project.remove({}, function(){ 
                        if(err) return callback(err);
                        console.log("Deleted all documents from Projects");
                        callback();
                    });
                },
                function(callback){
                    async.forEach(imagesData, function(doc){
                        new Image(doc).save(function(err,d){
                            if(err) return callback(err);
                            console.log("Added image: '" + d.name + "'");
                            callback();
                        });
                    }, function(err) {
                        if (err) return next(err);
                    })
                },
                function(callback){
                    async.forEach(projectsData, function(doc){
                        new Project(doc).save(function(err,d){
                            if(err) return callback(err);
                            console.log("Added project: '" + d.name + "'");
                            callback();
                        });
                    }, function(err) {
                        if (err) return next(err);
                    });
                },
                function(callback){
                    for( var i = 0; i < mapperData.length; i++ ) {
                        var proj = Project.find({ name : mapperData[i].project } )
                        for (var j=0; j<mapperData[i].images; j++){
                            var img = Image.find({ name : mapperData[i].images[j] } );
                            proj.images.push(img._id).save();
                        }
                        proj.populate("images").exec(function(err,proj){
                            if(err) return callback(err);
                            console.log("Project '" + proj.name + "' populated with images array.");
                        });
                    }
                    callback();
                }
                // mappColl()
            ], function(err){
                if(err) console.error(err);
                console.log("Database data has been reseted");
        });
    });
    // db.close();
}

exports.resetDB = resetDB;