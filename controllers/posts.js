var express = require('express');
var router = express.Router();
var Post = require('../models/post.js');
var Comment = require('../models/comment.js');

// var socket = io();

//allow api requests from ionic front end
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.get('/:lon/:lat',function(req,res,next){
	var latMin = parseFloat(req.params.lat)-.002;
	var latMax = parseFloat(req.params.lat)+.002;
	var lonMin = parseFloat(req.params.lon)-.002;
	var lonMax = parseFloat(req.params.lon)+.002;
	console.log(latMin,lonMin)
	Post.find({'location.lat':{$gte:latMin,$lte:latMax},'location.lon':{$gte:lonMin,$lte:lonMax}}).
	skip().
	limit(10).
	sort({date:-1}).
	exec(function(err,posts){
		res.send(posts)
	})
});	

router.post('/',function(req,res,next){
	var post = new Post();
	    post.post = req.body.post;
	    post.location = req.body.location;
	    // post.comments.push({comment:req.body.comment});
		post.save(function(err){
			console.log(post);
			res.send(post);
		});
});

router.get('/:id',function(req,res,next){
	Post.findOne({_id:req.params.id},function(err,post){
		post.comments = post.comments.sort(function(comment1,comment2){
			return comment2.date - comment1.date
		})
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