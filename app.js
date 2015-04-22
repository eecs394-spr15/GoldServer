var express = require('express'),
	config = require('./config/config'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	twilio = require('twilio'),
	client = twilio.RestClient(process.env.TWILIO_SID, process.env.TWILIO_KEY),
	cronJob = require('cron').CronJob;

mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function () {
	throw new Error('unable to connect to database at ' + config.db);
});

var messages = require(config.root + '/app/models/message')
var user = require(config.root + '/app/models/user')
var app = express();

require('./config/express')(app, config);

app.listen(config.port);

var textJob = new cronJob( '0 21 * * *', function(){
	client.sms.messages.create({
		to:'9522173060',
		from:'+16122551628',
		body:'Cron test'
	}, function(error, message) {
		if (!error) {
			console.log('Success!');
		} else {
			console.log(error);
		}
	});
},  null, true);

seed();

function seed(){
	var d1 = new Date("April 13, 2015");
	var d2 = new Date("April 12, 2015");
	var d3 = new Date("April 11, 2015");
	var d4 = new Date("April 10, 2015");
	var d5 = new Date("April 9, 2015");

	var newMessage1 = new messages({
		text: "I twisted my ankle on my way to Tech today, but class was so interesting that I couldn't remain upset. I got a lot of work done afterward and felt particularly productive.  Then I had sorbet and it was delicious. Great day.",
		date: d1,
		phone: "9145557111",
		rating: 2
	})
	newMessage1.save(function(err, newMessage){
		if(err) return err;
		console.log('text: ' + newMessage['text']);
	})

	var newMessage2 = new messages({
		text: "It was a rainy day today and I stayed inside working on my art project.  I felt a little lonely but also accomplished.",
		date: d2,
		phone: "9145557111",
		rating: 3
	})
	newMessage2.save(function(err, newMessage){
		if(err) return err;
		console.log('text: ' + newMessage['text']);
	})

	var newMessage3 = new messages({
		text: "Today I woke up with a vast skin infection.  I laid in bed all day and was unable to do anything else - hopefully this goes away soon.",
		date: d3,
		phone: "9145557111",
		rating: 1
	})
	newMessage3.save(function(err, newMessage){
		if(err) return err;
		console.log('text: ' + newMessage['text']);
	})

	var newMessage4 = new messages({
		text: "I have been feeling a lot better, and my former skin infection has gone away.  I also found a 20 dollar bill on the floor. Lucky me!",
		date: d4,
		phone: "9145557123",
		rating: 4
	})
	newMessage4.save(function(err, newMessage){
		if(err) return err;
		console.log('text: ' + newMessage['text']);
	})

	var newMessage5 = new messages({
		text: "My friend Jenning's dog died and I am feeling very sad. I was very attached to that dog even though it wasn't mine.  I also won 57 games of my favorite video game.",
		date: d5,
		phone: "9145557123",
		rating: 2
	})


	newMessage5.save(function(err, newMessage){
		if(err) return err;
		console.log('text: ' + newMessage['text']);
	})

	var newUser = new user({
		name: "John",
		phone: "8479991111",
		currentStatus: "active"
	})


	newUser.save(function(err, newUser){
		if(err) return err;
		console.log('name: ' + newUser['name']);
	})
}
