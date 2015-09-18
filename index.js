var express = require('express');
var mongoose = require('mongoose');
var io = require('socket.io')
var uristring = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/shoutout_dev';
mongoose.connect(uristring, function(err, res){
	if (err) {
      console.log ('ERROR connecting to: ' + uristring + '. ' + err);
      } else {
      console.log ('Succeeded connected to: ' + uristring);
  	}
});
var Post = require('./models/post.js');
var Comment = require('./models/comment.js');
var bodyParser = require('body-parser');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection', function(socket){

	socket.on('new post', function(data){
			io.emit('new post');
		});
})

//App config
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api/posts', require('./controllers/posts.js'));

server.listen(process.env.PORT || 3000);