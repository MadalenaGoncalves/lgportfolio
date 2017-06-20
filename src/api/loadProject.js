'use strict';

var mongoose = require('mongoose');
require('./../models/projects.js');
var Project = mongoose.model('projects');

exports.loadPortfolio2 = function(req,res){
  let query = Project.find({},'name title companyUrl', function(err,docs){
    if(err) {
      // Issue Internal Server Error
      return res.stats(500).json({message: err.message});
    }
    res.json(docs);
  });
}

exports.loadProject = function (req, res) {
  // console.log("@loadProject.js : " + req.params.name);
  var queryFind = Project.findOne({ 'name': req.params.name })
  .populate('images')
  .exec(function (err, docs) {
      if(err) {
        // Issue Internal Server Error
        return res.stats(500).json({message: err.message});
      }
      res.json(docs);
  });
}

exports.newProject = function (req, res) {
  console.log("@loadProject.js:newProject");
}

exports.updateProject = function (req, res) {
  console.log("@loadProject.js:updateProject");
}

exports.deleteProject = function (req, res) {
  console.log("@loadProject.js:deleteProject");
}



