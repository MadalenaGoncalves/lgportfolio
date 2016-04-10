var mongoose = require('mongoose');

var imageSchema = mongoose.Schema({
    name    : String,
    caption : String
});

var Images = mongoose.model('Images',imageSchema);

module.exports = Images;