'use strict';

require('./../models/projects.js');

// print something in mongo shell: 
// > db.projects.find({name : "proj7"},{name: 1, title: 1}).pretty()
// > db.projects.find({_id : ObjectId("5949152d469f3526f520d3f5")},{name: 1, title: 1}).pretty()


const mongoose = require('mongoose');
let Project = mongoose.model('projects');

exports.getPortfolio = function(req,res){
  console.log("@api.js:loadPortfolio");
  // let query = Project.find({},'name title').exec(myCallback);
  let query = Project.find({}).exec(function(err,docs){
    if(err) {
      // Issue Internal Server Error
      return res.stats(500).json({message: err.message});
    }
    res.json(docs);
  });
}

exports.getProject = function (req, res) {
  console.log("@api.js:loadProject : " + req.params.id);
  Project.findOne({ '_id': req.params.id })
  .populate('images')
  .exec(function(err,docs){
    if(err) {
      // Issue Internal Server Error
      return res.stats(500).json({message: err.message});
    }
    res.json(docs);
  });
}

// exports.addProject = function (req, res) {
//   console.log("@api.js:addProject");
//   // console.log(req);
//   let proj = {
//     name          : ("undefined" === typeof req.body.name) ? "" : req.body.name,
//     shortTitle    : ("undefined" === typeof req.body.shortTitle) ? "" : req.body.shortTitle,
//     shortDesc     : ("undefined" === typeof req.body.shortDesc) ? "" : req.body.shortDesc,
//     title         : ("undefined" === typeof req.body.title) ? "" : req.body.title,
//     description   : ("undefined" === typeof req.body.description) ? "" : req.body.description,
//     category      : ("undefined" === typeof req.body.category) ? "" : req.body.category,
//     startYear     : ("undefined" === typeof req.body.startYear) ? "" : req.body.startYear,
//     endYear       : ("undefined" === typeof req.body.endYear) ? "" : req.body.endYear,
//     thumbnailId   : ("undefined" === typeof req.body.thumbnailId) ? "" : req.body.thumbnailId,
//     address       : ("undefined" === typeof req.body.address) ? "" : req.body.address,
//     country       : ("undefined" === typeof req.body.country) ? "" : req.body.country,
//     city          : ("undefined" === typeof req.body.city) ? "" : req.body.city,
//     grossArea     : ("undefined" === typeof req.body.grossArea) ? "" : req.body.grossArea,
//     floorArea     : ("undefined" === typeof req.body.floorArea) ? "" : req.body.floorArea,
//     company       : ("undefined" === typeof req.body.company) ? "" : req.body.company,
//     companyUrl    : ("undefined" === typeof req.body.companyUrl) ? "" : req.body.companyUrl,
//     participation : ("undefined" === typeof req.body.participation) ? "" : req.body.participation
//   };
  
//   new Project(proj).save(function(err,docs){
//     if(err) {
//       // Issue Internal Server Error
//       return res.stats(500).json({message: err.message});
//     }
//     res.json(docs);
//   });
// }

// exports.updateProject = function (req, res) {
//   console.log("@api.js:updateProject");
//   console.log(req);
//   let id = req.params.id;
//   let proj = {
//     name          : ("undefined" === typeof req.body.name) ? "" : req.body.name,
//     shortTitle    : ("undefined" === typeof req.body.shortTitle) ? "" : req.body.shortTitle,
//     shortDesc     : ("undefined" === typeof req.body.shortDesc) ? "" : req.body.shortDesc,
//     title         : ("undefined" === typeof req.body.title) ? "" : req.body.title,
//     description   : ("undefined" === typeof req.body.description) ? "" : req.body.description,
//     category      : ("undefined" === typeof req.body.category) ? "" : req.body.category,
//     startYear     : ("undefined" === typeof req.body.startYear) ? "" : req.body.startYear,
//     endYear       : ("undefined" === typeof req.body.endYear) ? "" : req.body.endYear,
//     thumbnailId   : ("undefined" === typeof req.body.thumbnailId) ? "" : req.body.thumbnailId,
//     address       : ("undefined" === typeof req.body.address) ? "" : req.body.address,
//     country       : ("undefined" === typeof req.body.country) ? "" : req.body.country,
//     city          : ("undefined" === typeof req.body.city) ? "" : req.body.city,
//     grossArea     : ("undefined" === typeof req.body.grossArea) ? "" : req.body.grossArea,
//     floorArea     : ("undefined" === typeof req.body.floorArea) ? "" : req.body.floorArea,
//     company       : ("undefined" === typeof req.body.company) ? "" : req.body.company,
//     companyUrl    : ("undefined" === typeof req.body.companyUrl) ? "" : req.body.companyUrl,
//     participation : ("undefined" === typeof req.body.participatio) ? "" : req.body.participation
//   };
  
//   Project.findByIdAndUpdate( id, proj, {upsert:false} )
//   .exec(function(err,docs){
//     if(err) {
//       // Issue Internal Server Error
//       return res.stats(500).json({message: err.message});
//     }
//     res.json(docs);
//   });
// }

// exports.upsertProject = function (req, res) {
//   console.log("@api.js:upsert");

//   let id = ("undefined" === typeof req.body.id) ? new mongoose.mongo.ObjectID() : req.body.id;
//   let proj = {
//     name          : ("undefined" === typeof req.body.name) ? "" : req.body.name,
//     shortTitle    : ("undefined" === typeof req.body.shortTitle) ? "" : req.body.shortTitle,
//     shortDesc     : ("undefined" === typeof req.body.shortDesc) ? "" : req.body.shortDesc,
//     title         : ("undefined" === typeof req.body.title) ? "" : req.body.title,
//     description   : ("undefined" === typeof req.body.description) ? "" : req.body.description,
//     category      : ("undefined" === typeof req.body.category) ? "" : req.body.category,
//     startYear     : ("undefined" === typeof req.body.startYear) ? "" : req.body.startYear,
//     endYear       : ("undefined" === typeof req.body.endYear) ? "" : req.body.endYear,
//     thumbnailId   : ("undefined" === typeof req.body.thumbnailId) ? "" : req.body.thumbnailId,
//     address       : ("undefined" === typeof req.body.address) ? "" : req.body.address,
//     country       : ("undefined" === typeof req.body.country) ? "" : req.body.country,
//     city          : ("undefined" === typeof req.body.city) ? "" : req.body.city,
//     grossArea     : ("undefined" === typeof req.body.grossArea) ? "" : req.body.grossArea,
//     floorArea     : ("undefined" === typeof req.body.floorArea) ? "" : req.body.floorArea,
//     company       : ("undefined" === typeof req.body.company) ? "" : req.body.company,
//     companyUrl    : ("undefined" === typeof req.body.companyUrl) ? "" : req.body.companyUrl,
//     participation : ("undefined" === typeof req.body.participatio) ? "" : req.body.participation
//   };

  Project.findByIdAndUpdate( id, proj, {upsert:true, new:true} )
  .exec(function(err,docs){
    if(err) {
      // Issue Internal Server Error
      return res.stats(500).json({message: err.message});
    }
    res.json(docs);
  });
}

exports.deleteProject = function (req, res) {
  console.log("@api.js:deleteProject : " + req.params.id);

  Project.findByIdAndRemove(req.params.id)
  .exec(function(err,docs){
    if(err) {
      // Issue Internal Server Error
      return res.stats(500).json({message: err.message});
    }
    res.json(docs);
  });
}