var mongoose = require( 'mongoose' );
require( './../db/models/projects.js' );
var Project = mongoose.model( 'projects' );

exports.getProjects = function(req,resp){
    var query = Project.find({},'name title companyUrl',function(err,docs){
        resp.json(docs);
    });
}
