var mongoose = require('mongoose');

var schema = {
    shortTitle    : String,
    shortDesc     : String,
    title         : String,
    description   : String,
    category      : String,
    startDate     : Date,
    endDate       : Date,
    thumbnailId   : String,
    address       : String,
    country       : String,
    city          : String,
    grossArea     : Number,
    floorArea     : Number,
    company       : String,
    companyUrl    : String,
    participation : String
};

var Projects = mongoose.model('Projects',schema);

module.exports = Projects;