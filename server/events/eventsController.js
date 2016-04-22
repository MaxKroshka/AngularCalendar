var Event = require('./eventModel.js');
var utils = require('../config/utils.js');
var mongoose = require('mongoose');

module.exports = {

  getEvents: function(req, res) {
    var month = req.query.month;
    Event.find({ month: month })
      .then(function(events) {
        var eventsObject = utils.createEventsObject(events);
        res.json(eventsObject);
      })
      .catch(function(error) {
        console.error('There was an error retrieving events', error);
      });
  },

  addEvent: function(req, res) {
    var event = req.body;
    if (event) {
      Event.create(event)
        .then(function(createdEvent) {
          if (createdEvent) {
            res.json(createdEvent);
          }
        })
        .catch(function(error) {
          console.error('There was an error creating event', error);
        });
    } else {
      res.send(404);
    }
  },

  updateEvent: function(req, res) {
    var eventID = req.body._id;
    var event = req.body;
    delete event['_id'];
    Event.update({ _id: mongoose.Types.ObjectId(eventID)}, event)
      .then(function(updatedEvent) {
        res.json(updatedEvent);
      })
      .catch(function(error) {
        console.error('There was an error updating event', error);
      });
  },

  removeEvent: function(req, res) {
    var eventID = req.query._id;
    Event.findOne({ _id: mongoose.Types.ObjectId(eventID)})
      .then(function(foundEvent) {
        return foundEvent.remove();
      })
      .then(function() {
        res.json();
        console.log('removed');
      })
      .catch(function(error) {
        console.error('There was an error removing event', error);
      });
  }

};
