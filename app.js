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

seed();

function seed(){
	var newMessage1 = new messages({
		text: "Test message 1"
	})
	newMessage1.save(function(err, newMessage){
		if(err) return err;
		console.log('text: ' + newMessage['text']);
	})	

	var newMessage2 = new messages({
		text: "Test message 2"
	})
	newMessage2.save(function(err, newMessage){
		if(err) return err;
		console.log('text: ' + newMessage['text']);
	})
}
