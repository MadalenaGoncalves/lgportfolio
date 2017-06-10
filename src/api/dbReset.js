'use strict';

let      async = require('async'),
      mongoose = require( 'mongoose' ),
      imgModel = require( './../models/images.js' ),
     projModel = require( './../models/projects.js' ),
  projectsData = require( './../data/projects.json' ),
    imagesData = require( './../data/images.json' ),
           map = require( './../data/projImgMapper.json' );

// get refs to the models we defined above
const Image = mongoose.model( 'images' ),
    Project = mongoose.model( 'projects' );

exports.reset = function(req,resp,resetCallback){
  async.series(
    [
      function(callback){
        Image.remove({}, function(err){ 
          if(err) return callback(err);
          // console.log("Deleted all documents from Images");
          callback();
        });
      },
      function(callback){
        Project.remove({}, function(err){ 
          if(err) return callback(err);
          // console.log("Deleted all documents from Projects");
          callback();
        });
      },
      function(callback){
        async.forEach(imagesData, function(doc,callback){
          new Image(doc).save(function(err,d){
            // if(err) return callback(err);
            // console.log("Added image: '" + d.name + "'");
            callback();
          });
        }, function(err) {
          // if (err) return next(err);
          // console.log("Finished images");
          callback();
        })
      },
      function(callback){
        async.forEach(projectsData, function(doc,callback){
          new Project(doc).save(function(err,d){
            // if(err) return callback(err);
            // console.log("Added project: '" + d.name + "'");
            callback();
          });
        }, function(err) {
          // if (err) return next(err);
          // console.log("Finished projects");
          callback();
        })
      },
      function(afterLoopCallback) {
        async.forEach(map, function(elem,mapItemCallback) {
          Project.findOne({ name : elem.project }, function(err,proj) {
            async.forEach(elem.images, function(imgName,imgArrCallback) {
              Image.findOne({ name : imgName },'_id name', function(err,img) {
                proj.images.push(img._id);
                proj.save(imgArrCallback);
                // console.log("Pushed image '" + img.name + "' into project '" + proj.name + "'");
              } );
            },
            function(err){
              // if (err) return next(err);
              mapItemCallback();
            })
          });
        }, function(err) {
          // if (err) return next(err);
          // console.log("Finished mapping images to projects");
          afterLoopCallback();
        })
      }
    ], function(err){
      if(err) console.error(err);
      console.log("Database data has been reseted");
      resetCallback();
  });
}