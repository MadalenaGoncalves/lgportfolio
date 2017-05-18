var mongoose = require('mongoose');

var imageSchema = mongoose.Schema({
    name    : String,
    caption : String
});

var Images = mongoose.model('images',imageSchema);

module.exports = Images;