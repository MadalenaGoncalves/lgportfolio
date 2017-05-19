'use strict';

const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
    name    : String,
    caption : String
});

let Images = mongoose.model('images',imageSchema);
module.exports = Images;