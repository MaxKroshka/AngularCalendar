var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
  name: String,
  time: String,
  description: String,
});

module.exports = mongoose.model('Event', EventSchema);
