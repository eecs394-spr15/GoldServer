var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var status = 'active, inactive, new, disabled'.split(',')

var userSchema = new Schema({
  name: String,
  phone: String,
  currentStatus: {type: String, enum: status}
});

var user = mongoose.model('user', userSchema);
module.exports = user;