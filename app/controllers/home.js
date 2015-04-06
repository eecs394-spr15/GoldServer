var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  path = require('path'),
  rootPath = path.normalize(__dirname + '/..'),
  messageTransform = require('../services/messageHandler.js')

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
  var mes = req.body.mes;
  messageTransform(mes);
})

router.get('/messages/:id', function(req, res){
  message.find({'_id': req.params.id}, function(err, data){
    res.send(data);
  })
})
