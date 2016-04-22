var Event = require('./eventModel.js');

module.exports = {

  getEvents: function(req, res) {
    var date = req.date;
    Event.find({ date: date })
      .then(function(events) {
        res.json(events);
      })
      .catch(function(error) {
        console.error('There was an error retrieving events', error);
      });
  },

  addEvent: function(req, res) {
    var event = req.body.event;
    Event.create(event)
      .then(function(createdEvent) {
        if (createdEvent) {
          res.json(createdEvent);
        }
      })
      .catch(function(error) {
        console.error('There was an error creating event', error);
      });
  },

  updateEvent: function(req, res, next) {
    var event = req.body.event;
    Event.update({ name: event.name })
      .then(function(updatedEvent) {
        res.json(updatedEvent);
      })
      .catch(function(err) {
        console.error('There was an error updating event', error);
      });
  },

  removeEvent: function(req, res, next) {
    var event = req.body.event;
    Event.findOne({ name: event.name, date: event.date })
      .then(function(foundEvent) {
        return foundEvent.remove();
      })
      .then(function() {
        res.json();
        console.log('removed');
      })
      .catch(function(err) {
        console.error('There was an error removing event', error);
      });
  }

};
