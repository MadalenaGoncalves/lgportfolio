var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var ImgModel = require('./images.js');
var ImgSchema = mongoose.model('images').schema;

// Schema declaration
var projectSchema = mongoose.Schema({
    name          : String,
    shortTitle    : String,
    shortDesc     : String,
    title         : String,
    description   : String,
    category      : String,
    startYear     : Date,
    endYear       : Date,
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

// Behavior - NOTE: methods must be added to the schema before compiling it with mongoose.model()
// projectSchema.methods.[method_name] = function(){ ... }

// kittySchema.methods.speak = function () {
//   var greeting = this.name
//     ? "Meow name is " + this.name
//     : "I don't have a name";
//   console.log(greeting);
// }

var Projects = mongoose.model('projects',projectSchema);

module.exports = Projects;