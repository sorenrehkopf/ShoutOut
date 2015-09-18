var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var Comment = require('../models/comment.js');

var Post = new Schema({
    id: ObjectId,
    date: {type: Date, default: Date.now},
    post: String,
    poster: String,
    location: {
    	lon: Number,
    	lat: Number,
    },
    comments: [Comment.schema]
});


module.exports = mongoose.model('Post', Post);