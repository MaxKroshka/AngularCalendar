angular.module('calendar.main', [])

.controller('MainCtrl', function($scope, MonthGenerator, Events) {
  $scope.selectedMonth = moment();
  $scope.selectedDay = moment();
  var firstDay = moment().date(1).day(0).day(0).hour(0).minute(0).second(0).millisecond(0);
  $scope.weeks = MonthGenerator.buildMonth(firstDay, $scope.selectedMonth.format('M'));

  $scope.addEvent = function() {
    var event = Object.assign({}, $scope.event);
    event.date = moment($scope.event.date).format('L');
    event.time = moment($scope.event.time).format('LT');
    event.month = $scope.selectedDay.clone().format('MMMM');
    Events.addEvent(event);
    $scope.month[event.date] = $scope.month[event.date] || [];
    $scope.month[event.date].push(event);
    $scope.event = {};
  };

  $scope.updateEvent = function(event) {
    Events.updateEvent($scope.event);
  };

  $scope.removeEvent = function(event) {
    Events.removeEvent(event)
      .then(function(success) {
        $scope.fetchMonth();
      })
      .catch(function(error) {
        console.log('There was an error removing event');
      });
  };

  $scope.changeMonth = function(direction) {
    $scope.selectedMonth = direction ? $scope.selectedMonth.add(1, 'month') : $scope.selectedMonth.subtract(1, 'month');
    firstDay = $scope.selectedMonth.clone().date(1).day(0).day(0).hour(0).minute(0).second(0).millisecond(0);
    $scope.weeks = MonthGenerator.buildMonth(firstDay, $scope.selectedMonth.format('M'));
  };

  $scope.selectDay = function(day) {
    $scope.selectedDay = day.date;
    $scope.showList = true;
    $scope.events = $scope.month[$scope.selectedDay.clone().format('L')];
  };

  $scope.fetchMonth = function() {
    Events.getEvents($scope.selectedDay.clone().format('MMMM'))
      .then(function(events) {
        console.log(events);
        $scope.month = events;
        $scope.events = $scope.month[$scope.selectedDay.clone().format('L')];
      })
      .catch(function(error) {
        console.log('There was an error getting events for this date');
      });
  };

  $scope.fetchMonth();
});
