'use strict';

var mongoose = require('mongoose');
require('./../models/projects.js');
var Project = mongoose.model('projects');

exports.loadProject = function (req, resp) {
    // console.log("@loadProject.js : " + req.params.name);
    var queryFind = Project.findOne({ 'name': req.params.name })
    .populate('images')
    .exec(function (err, docs) {
        if(err) {
          // Issue Internal Server Error
          return res.stats(500).json({message: err.message});
        }
        resp.json(docs);
    });
}