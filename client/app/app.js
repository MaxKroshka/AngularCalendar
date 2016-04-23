angular.module('calendar', ['ngRoute', 'ngAnimate', 'calendar.main', 'calendar.services'])
  .config(function($routeProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/calendar/calendar.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        templateUrl: 'app/calendar/calendar.html',
        controller: 'MainCtrl'
      });
  });
