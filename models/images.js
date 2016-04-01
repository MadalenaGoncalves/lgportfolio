var mongoose = require('mongoose');

var schema = {
    imageId   : String,
    caption   : String
};

var Images = mongoose.model('Images',schema);

module.exports = Images;