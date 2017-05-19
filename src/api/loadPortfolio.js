'use strict';

var mongoose = require('mongoose');
require('./../models/projects.js');
var Project = mongoose.model('projects');

exports.loadPortfolio = function(req,res){
  var query = Project.find({},'name title companyUrl',function(err,docs){
    if(err) {
      // Issue Internal Server Error
      return res.stats(500).json({message: err.message});
    }
    res.json(docs);
  });
}
