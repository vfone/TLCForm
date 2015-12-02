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
      .when('/employment', {
        templateUrl: 'views/employment.html',
        controller: 'EmploymentCtrl',
        controllerAs: 'employment'
      })
      .when('/information', {
        templateUrl: 'views/information.html',
        controller: 'InformationCtrl',
        controllerAs: 'information'
      })
      .when('/course', {
        templateUrl: 'views/course.html',
        controller: 'CourseCtrl',
        controllerAs: 'course'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .directive('dob', function () {
    return {
        require: 'ngModel',
        link: function (scope, el, attr, ngModel) {
            $(el).datepicker({
                format: 'dd/mm/yyyy',
                autoclose: true
            });
        }
    };
  })
  .directive('expirydate', function () {
    return {
        require: 'ngModel',
        link: function (scope, el, attr, ngModel) {
            $(el).datepicker({
                format: 'dd/mm/yyyy',
                autoclose: true
            });
        }
    };
  })
  .directive('schoolyear', function () {
    return {
        require: 'ngModel',
        link: function (scope, el, attr, ngModel) {
            $(el).datepicker({
                format: 'yyyy',
                startView: "years",
                minViewMode: "years",
                autoclose: true
            });
        }
    };
  })
  .directive('qualificationyear', function () {
    return {
        require: 'ngModel',
        link: function (scope, el, attr, ngModel) {
            $(el).datepicker({
                format: 'yyyy',
                startView: "years",
                minViewMode: "years",
                autoclose: true
            });
        }
    };
  })
  .directive('lastworkyear', function () {
    return {
        require: 'ngModel',
        link: function (scope, el, attr, ngModel) {
            $(el).datepicker({
                format: 'yyyy',
                startView: "years",
                minViewMode: "years",
                autoclose: true
            });
        }
    };
  })

  ;
