var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Comment = new Schema({
    id: ObjectId,
    date: {type: Date, default: Date.now},
    comment: String,
    poster: String
});


module.exports = mongoose.model('Comment', Comment);