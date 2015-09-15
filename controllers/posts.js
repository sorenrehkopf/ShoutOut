var express = require('express');
var router = express.Router();
var Post = require('../models/post.js');
var Comment = require('../models/comment.js');

router.get('/',function(req,res){
	Post.find({},function(err,posts){
		res.header("Access-Control-Allow-Origin: * ");
		res.send(posts);
	})
});

router.post('/',function(req,res){
	var post = new Post();
	    post.post = req.body.post;
	    // post.comments.push({comment:req.body.comment});
		post.save(function(err){
			console.log(post);
			res.send(post);
		});
});

router.get('/:id',function(req,res){
	Post.findOne({_id:req.params.id},function(err,post){
		res.send(post);
	})
});

router.post('/:id',function(req,res){
	Post.findOne({_id:req.params.id},function(err,post){
			console.log(post);
			post.comments.push({comment:req.body.comment});
			post.save(function(err){
				console.log(post);
				res.send(post)
			})
		});
	});

module.exports = router;