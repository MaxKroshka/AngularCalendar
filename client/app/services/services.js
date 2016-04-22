angular.module('calendar.services', [])

.factory('Events', function($http) {

  var getEvents = function() {
    return $http({
      method: 'GET',
      url: 'api/events'
    }).then(function(res) {
      return res.data;
    });
  };

  var addEvent = function(event) {
    return $http({
      method: 'POST',
      url: 'api/events',
      data: event
    });
  };

  var removeEvent = function(event) {
    return $http({
      method: 'POST',
      url: 'api/events/remove',
      data: event
    });
  };

  var updateEvent = function(event) {
    return $http({
      method: 'PUT',
      url: 'api/events/update',
      data: event
    });
  };

  return {
    getEvents: getEvents,
    addEvent: addEvent,
    removeEvent: removeEvent,
    updateEvent: updateEvent
  };
})

.factory('MonthGenerator', function() {

  var buildMonth = function(start, month) {
    var weeks = [];
    var done = false;
    var date = start.clone();
    var count = 0;
    while (!done) {
      weeks.push({ days: buildWeek(date, month) });
      date.add(1, 'week');
      done = count++ > 2 && month !== date.format('M');
    }
    return weeks;
  };

  var buildWeek = function(date, month) {
    var days = [];
    for (var i = 0; i < 7; i++) {
      days.push({
        number: date.date(),
        isCurrentMonth: date.format('M') === month,
        isToday: date.isSame(new Date(), 'day'),
        date: date
      });
      date = date.clone();
      date.add(1, 'day');
    }
    return days;
  };

  return {
    buildMonth: buildMonth
  };

});