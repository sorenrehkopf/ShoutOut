var express = require('express');
var mongoose = require('mongoose');
var uristring = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/shoutout_dev';
mongoose.connect(uristring, function(err, res){
	if (err) {
      console.log ('ERROR connecting to: ' + uristring + '. ' + err);
      } else {
      console.log ('Succeeded connected to: ' + uristring);
  	}
});
var bodyParser = require('body-parser');
var app = express();

//App config
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api/posts', require('./controllers/posts.js'));

app.listen(process.env.PORT || 3000);