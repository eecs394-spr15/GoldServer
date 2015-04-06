var config = require('../../config/config'),
  mongoose = require('mongoose'),
  path = require('path')

function main(mes){
	console.log(mes);

	var newMessage = new message({
	text: "test"
	})
	newMessage.save(function(err, newMessage){
	if(err) return err;
	console.log('text: ' + newMessage['text']);
	})

	return mes;
}

module.exports = main;