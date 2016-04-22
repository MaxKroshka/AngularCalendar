var eventsController = require('../events/eventsController');

module.exports = function(app, express) {
  app.route('/api/events/')
  .get(eventsController.getEvents)
  .post(eventsController.addEvent)
  .put(eventsController.updateEvent)
  .delete(eventsController.removeEvent);
};
