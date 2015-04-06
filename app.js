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
		text: "I twisted my ankle on my way to Tech today, but class was so interesting that I couldn't remain upset. I got a lot of work done afterward and felt particularly productive.  Then I had sorbet and it was delicious. Great day."
	})
	newMessage1.save(function(err, newMessage){
		if(err) return err;
		console.log('text: ' + newMessage['text']);
	})	

	var newMessage2 = new messages({
		text: "It was a rainy day today and I stayed inside working on my art project.  I felt a little lonely but also accomplished."
	})
	newMessage2.save(function(err, newMessage){
		if(err) return err;
		console.log('text: ' + newMessage['text']);
	})

	var newMessage3 = new messages({
		text: "Today I woke up with a vast skin infection.  I laid in bed all day and was unable to do anything else - hopefully this goes away soon."
	})
	newMessage3.save(function(err, newMessage){
		if(err) return err;
		console.log('text: ' + newMessage['text']);
	})

	var newMessage4 = new messages({
		text: "I have been feeling a lot better, and my former skin infection has gone away.  I also found a 20 dollar bill on the floor. Lucky me!"
	})
	newMessage4.save(function(err, newMessage){
		if(err) return err;
		console.log('text: ' + newMessage['text']);
	})

	var newMessage5 = new messages({
		text: "My friend Jenning's dog died and I am feeling very sad. I was very attached to that dog even though it wasn't mine.  I also won 57 games of my favorite video game."
	})
	newMessage5.save(function(err, newMessage){
		if(err) return err;
		console.log('text: ' + newMessage['text']);
	})
}
