angular.module('calendar.main', [])

.controller('MainCtrl', function($scope, MonthGenerator, Events) {
  $scope.dateNow = moment();
  $scope.selectedDay = moment();
  var firstDay = moment().date(1).day(0).day(0).hour(0).minute(0).second(0).millisecond(0);
  $scope.weeks = MonthGenerator.buildMonth(firstDay, $scope.dateNow.format('M'));
  $scope.events = Events.getEvents($scope.selectedDay);

  $scope.addEvent = function() {

  };

  $scope.changeMonth = function(direction) {
    $scope.dateNow = direction ? $scope.dateNow.add(1, 'month') : $scope.dateNow.subtract(1, 'month');
    firstDay = $scope.dateNow.clone().date(1).day(0).day(0).hour(0).minute(0).second(0).millisecond(0);
    $scope.weeks = MonthGenerator.buildMonth(firstDay, $scope.dateNow.format('M'));
  };

  $scope.selectDay = function(day) {
    $scope.selectedDay = day.date;
    Events.getEvents($scope.selectedDay);
  };
  
});
