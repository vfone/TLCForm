'use strict';

/**
 * @ngdoc function
 * @name tlcApp.controller:PersonalCtrl
 * @description
 * # PersonalCtrl
 * Controller of the tlcApp
 */
angular.module('tlcApp')
   .controller('PersonalCtrl', function ($rootScope, $scope, $location, settingFactory, coreService, coreFactory) {
     if(!coreFactory.isVerified){
       //if user not verifed, redirect to login page
       //$location.path('/');  TODO: disable when ready
       coreFactory.fetchData(settingFactory.lookupURL); //TODO: delete this when ready
     }
     $scope.ApplicantId = coreFactory.applicantData.ApplicantId;
     $scope.lookupData = coreService.ParseJSON(coreService.getLocalStorage('lookupData'));
     $scope.Titles = $scope.lookupData.Titles;
     $scope.Genders= $scope.lookupData.Genders;
     //TODO: convert coreFactory.translateBoolean(HasAgreeTermAtBeginning);
     //TODO: convert coreFactory.UTCTime($scope.date));
});
