var express = require('express'),
	config = require('./config/config'),
	mongoose = require('mongoose');

mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});

var messages = require(config.root + '/app/models/message')
var app = express();

require('./config/express')(app, config);

app.listen(config.port);


var newMessage = new messages({
	text: "Today was the best day ever!"
})

newMessage.save(function(err, newMessage){
	if(err) return err;
	console.log('text: ' + newMessage['text']);
})
