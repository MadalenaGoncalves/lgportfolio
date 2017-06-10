'use strict';

const mongoose = require('mongoose'),
        Schema = mongoose.Schema,
      ImgModel = require('./images.js'),
     ImgSchema = mongoose.model('images').schema;

const projectSchema = mongoose.Schema({
    name          : String,
    shortTitle    : String,
    shortDesc     : String,
    title         : String,
    description   : String,
    category      : String,
    startYear     : Number,
    endYear       : Number,
    thumbnailId   : String,
    address       : String,
    country       : String,
    city          : String,
    grossArea     : Number,
    floorArea     : Number,
    company       : String,
    companyUrl    : String,
    participation : String,
    images        : [{ type: Schema.Types.ObjectId, ref: 'images' }]
});

let Projects = mongoose.model('projects',projectSchema);
module.exports = Projects;