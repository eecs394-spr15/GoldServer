var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var messageSchema = new Schema({
  text: String,
  date: { type: Date, default: Date.now },
  phone: String
});

// messageSchema.virtual('date')
//   .get(function(){
//     return this._id.getTimestamp();
//   });

var message = mongoose.model('message', messageSchema);
module.exports = message;