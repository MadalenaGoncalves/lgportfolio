var mongoose = require('mongoose');
require('./../models/projects.js');
var Project = mongoose.model('projects');

exports.loadPortfolio = function(req,res){
    var query = Project.find({},'name title companyUrl',function(err,docs){
        res.json(docs);
    });
}
