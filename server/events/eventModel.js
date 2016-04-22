var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: String, required: true },
  month: { type: String, required: true },
  time: { type: String, default: 'All Day' },
  description: String,
});

module.exports = mongoose.model('Event', EventSchema);
