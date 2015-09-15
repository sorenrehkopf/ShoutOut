
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/shoutout_dev');

var Post = require('./models/post.js');

	Post.find({},function(err,posts){
		console.log('err',err);
		console.log(posts);
	})

	// var post = new Post();
 //    post.post = 'my data goes here';
	// post.save(function(err){
	// 	console.log(post)
	// });
