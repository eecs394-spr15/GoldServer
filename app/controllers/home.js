var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  path = require('path'),
  rootPath = path.normalize(__dirname + '/..'),
  messageTransform = require('../services/messageHandler.js'),
  twilio = require('twilio'),
  KoalaParse = require('../services/KoalaParse.js');

var message = require(rootPath + '/models/message');

var client = new twilio.RestClient(process.env.TWILIO_SID, process.env.TWILIO_KEY);

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

router.get('/messages', function(req, res){
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
      to:req.query.phone,
      from:'+16122551628',
      body:'Hi, I\'m Koala'
  }, function(error, message) {
      if (!error) {
          console.log('Success!');
      } else {
          console.log(error);
      }
      console.log(req.query.phone);
      res.send('done');
  }); 

})
