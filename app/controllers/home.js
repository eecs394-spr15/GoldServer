var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  path = require('path'),
  rootPath = path.normalize(__dirname + '/..'),
  messageTransform = require('../services/messageHandler.js'),
  twilio = require('twilio');

var message = require(rootPath + '/models/message')

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  res.send('Koala');
});

router.get('/messages', function(req, res){
  message.find({}, function(err, data){
    res.send(data);
  })
})

router.post('/messages', function(req, res){
    if (twilio.validateExpressRequest(req, process.env.TWILIO_KEY)) {
        var twiml = new twilio.TwimlResponse();
        twiml.say('Node worked with Twilio.');
        res.type('text/xml');
        res.send(twiml.toString());
    }
    else {
        res.send('Error');
    }
})

router.get('/messages/:id', function(req, res){
  message.find({'_id': req.params.id}, function(err, data){
    res.send(data);
  })
})
