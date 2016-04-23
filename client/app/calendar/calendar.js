angular.module('calendar.main', [])

.controller('MainCtrl', function($scope, MonthGenerator, Events) {
  $scope.selectedMonth = moment();
  $scope.selectedDay = moment();
  $scope.event = {originalDate: new Date($scope.selectedDay)};
  var firstDay = moment().date(1).day(0).day(0).hour(0).minute(0).second(0).millisecond(0);
  $scope.weeks = MonthGenerator.buildMonth(firstDay, $scope.selectedMonth.format('M'));

  $scope.addEvent = function() {
    var event = Object.assign({}, $scope.event);
    event.date = moment($scope.event.originalDate).clone().format('L');
    event.time = $scope.event.originalTime ? moment($scope.event.originalTime).clone().format('LT') : null;
    event.month = moment($scope.event.originalDate).clone().format('MMMM');
    if ($scope.editing) {
      Events.updateEvent(event)
        .then(function(success) {
          $scope.fetchMonth(event.originalDate);
        })
        .catch(function(error) {
          console.log('There was an error adding or updating your event');
        });
    } else {
      Events.addEvent(event)
        .then(function(success) {
          $scope.fetchMonth(event.originalDate);
        })
        .catch(function(error) {
          console.log('There was an error adding or updating your event');
        });
    }
    $scope.editing = false;
  };

  $scope.toggleView = function(event) {
    if (event) {
      var eventToEdit = Object.assign({}, event);
      eventToEdit.originalDate = new Date(eventToEdit.originalDate);
      eventToEdit.originalTime = new Date(eventToEdit.originalTime);
      $scope.event = eventToEdit;
      $scope.editing = true;
    } else {
      $scope.event = {originalDate: new Date($scope.selectedDay)};
      $scope.editing = false;
    }
    $scope.showList = !$scope.showList;
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
    $scope.fetchMonth();
  };

  $scope.selectDay = function(day) {
    $scope.selectedDay = day.date;
    $scope.showList = true;
    $scope.events = $scope.month[$scope.selectedDay.clone().format('L')];
  };

  $scope.fetchMonth = function(date) {
    Events.getEvents($scope.selectedMonth.clone().format('MMMM'))
      .then(function(events) {
        $scope.month = events;
        $scope.events = $scope.month[$scope.selectedDay.clone().format('L')];
        date ? $scope.selectDay({date: moment(date)}) : null;
      })
      .catch(function(error) {
        console.log('There was an error getting events for this date');
      });
  };

  $scope.fetchMonth();
});
