var express = require('express');
var router = express.Router();
var Post = require('../models/post.js');
var Comment = require('../models/comment.js');

//allow api requests from ionic front end
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.get('/',function(req,res,next){
	Post.find({},function(err,posts){
		res.send(posts)
	})
});

router.post('/',function(req,res,next){
	var post = new Post();
	    post.post = req.body.post;
	    // post.comments.push({comment:req.body.comment});
		post.save(function(err){
			console.log(post);
			res.send(post);
		});
});

router.get('/:id',function(req,res,next){
	Post.findOne({_id:req.params.id},function(err,post){
		res.send(post);
	})
});

router.post('/:id',function(req,res,next){
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