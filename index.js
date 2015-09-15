var express = require('express');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/shoutout_dev');
var bodyParser = require('body-parser');
var app = express();

//App config
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api/posts', require('./controllers/posts.js'));

app.listen(3000)