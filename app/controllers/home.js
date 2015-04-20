var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  path = require('path'),
  rootPath = path.normalize(__dirname + '/..'),
  messageTransform = require('../services/messageHandler.js'),
  twilio = require('twilio'),
  KoalaParse = require('../services/KoalaParse.js');

var message = require(rootPath + '/models/message');

var client = new twilio.RestClient('AC2924c7e982cc332eca2fa08467ad3b1e', '99b30f488be7d5b20941cb94d515bdc9');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  res.send('Koala');
});

router.post('/messages', function(req, res){
  var newMessageObj = KoalaParse(req.body.Body);
  var pn = req.body.From;
  pn = pn.substring(2);
  var newMessage = new message({
    text: newMessageObj.message,
    rating: newMessageObj.rating,
    phone: pn
  })
  newMessage.save(function(err, newMessage){
    if(err) return err;
    console.log('text: ' + newMessage['text']);
  })
  var twiml = new twilio.TwimlResponse();
  twiml.message('Thanks! I\'ll record that entry for you.');
  res.type('text/xml');
  res.send(twiml.toString());
})

router.get('/messages/id/:id', function(req, res){
  message.find({'_id': req.params.id}, function(err, data){
    res.send(data);
  })
})

router.get('/messages/phone/:phone', function(req, res){
  message.find({'phone': req.params.phone}, function(err, data){
    res.send(data);
  })
})

router.get('/messages', function(req, res){
  console.log(req.query);
  if(Object.keys(req.query).length === 0){
    message.find({}).exec()
    .then(function(data){
      return res.send(data);
    })
  } else {
    message.find({'phone': req.query.phone}).exec()
    .then(function(data){
      return res.send(data);
    })
  }

})

router.post('/users/new', function(req, res){
  client.sms.messages.create({
      to:'+1' + req.query.phone,
      from:'+16122551628',
      body:'Hi, I\'m Koala'
  }, function(error, message) {
      if (!error) {
          console.log('Success! The SID for this SMS message is:');
          console.log(message.sid);
          console.log('Message sent on:');
          console.log(message.dateCreated);
      } else {
          console.log(error);
      }
      console.log(req.query.phone);
      res.send('done');
  }); 

})
