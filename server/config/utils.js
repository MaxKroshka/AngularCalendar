module.exports.createEventsObject = function(events) {
  var eventsObject = events.reduce(function(eventsObject, event) {
    eventsObject[event.date] = eventsObject[event.date] || [];
    eventsObject[event.date].push(event);
    return eventsObject;
  }, {});
  for (var key in eventsObject) {
    eventsObject[key].sort(function(a, b) {
      return new Date('1970/01/01 ' + a.time) - new Date('1970/01/01 ' + b.time);
    });
  }
  return eventsObject;
};
