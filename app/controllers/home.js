var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  path = require('path'),
  rootPath = path.normalize(__dirname + '/..'),
  messageTransform = require('../services/messageHandler.js'),
  twilio = require('twilio'),
  KoalaParse = require('../services/KoalaParse.js');

var message = require(rootPath + '/models/message')

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
