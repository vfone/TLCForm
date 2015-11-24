'use strict';

/**
 * @ngdoc overview
 * @name tlcApp
 * @description
 * # tlcApp
 *
 * Main module of the application.
 */
angular
  .module('tlcApp', [
    'ngResource',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/personal', {
        templateUrl: 'views/personal.html',
        controller: 'PersonalCtrl',
        controllerAs: 'personal'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .directive('calendar', function () {
    return {
        require: 'ngModel',
        link: function (scope, el, attr, ngModel) {
            $(el).datepicker({
                format: 'dd/mm/yyyy',
                autoclose: true
            });
        }
    };
});
