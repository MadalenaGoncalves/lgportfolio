'use strict';

const mongoose = require('mongoose');
require('./../models/projects.js');

let Project = mongoose.model('projects');

exports.loadPortfolio = function(req,res){
  let query = Project.find({},'name title companyUrl', function(err,docs){
    if(err) {
      // Issue Internal Server Error
      return res.stats(500).json({message: err.message});
    }
    res .json(docs);
  });
}
