var mongoose = require('mongoose');
require('./../models/projects.js');
var Project = mongoose.model('projects');

exports.loadProject = function (req, resp, name) {
    console.log("@loadProject.js : " + name);
    var query = Project.findOne({ 'name': name }, function (err, docs) {
        if(err) console.error(err);
        console.log("@loadProject.js : ok");
        resp.json(docs);
    });
}