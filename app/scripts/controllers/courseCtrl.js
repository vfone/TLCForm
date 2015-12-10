'use strict';

/**
 * @ngdoc function
 * @name tlcApp.controller:CourseCtrl
 * @description
 * # CourseCtrl
 * Controller of the tlcApp
 */
angular.module('tlcApp')
   .controller('CourseCtrl', function ($rootScope, $scope, $location, $window, settingFactory, coreService, coreFactory) {
     $scope.coreFactory = coreFactory;

     if(!$rootScope.isVerified){
       //if user not verifed, redirect to login page
       $location.path('/');
     }

     $scope.lookupData = coreService.ParseJSON(coreService.getLocalStorage('lookupData'));
     $scope.Courses = $scope.lookupData.Courses;
     $scope.StudyModes= $scope.lookupData.StudyModes;
     $scope.ModeOfStudyList = {ids: {}, arr: []};
     $scope.StudyReasons = $scope.lookupData.StudyReasons;

     $scope.stepValid = true;
     $scope.stepValidMsg = {};
     if($.isEmptyObject(coreFactory.applicantData)){
       coreFactory.applicantData = coreService.ParseJSON(coreService.getLocalStorage('applicantData'));
     }
     if(coreFactory.applicantData.ApplicantId){
       $scope.ApplicantId = coreFactory.applicantData.ApplicantId;
       $scope.CourseID = coreFactory.applicantData.CourseID;
       if(coreFactory.applicantData.ModeOfStudy !== undefined){
         $scope.ModeOfStudyList.arr = coreFactory.applicantData.ModeOfStudy;
         //console.log($scope.ModeOfStudyList.arr);
         for(var n = 0; n < $scope.ModeOfStudyList.arr.length; n++){
           var key = $scope.ModeOfStudyList.arr[n];
           //console.log(key);
           $scope.ModeOfStudyList.ids[key] = true;
         }
       }
       $scope.ApplyRPL = coreFactory.translateBoolean(coreFactory.applicantData.ApplyRPL);
       $scope.ApplyCreditTransfer = coreFactory.translateBoolean(coreFactory.applicantData.ApplyCreditTransfer);
       $scope.StudyReason = coreFactory.applicantData.StudyReason;
       $scope.OtherStudyReason = coreFactory.applicantData.OtherStudyReason;
       $scope.PassYear10English = coreFactory.applicantData.PassYear10English;
       $scope.CompleteEnglishTest = coreFactory.applicantData.CompleteEnglishTest;
       $scope.IELTSScore = coreFactory.applicantData.IELTSScore;
     }

     $scope.prev = function(){
       $location.path('/information');
     }
     $scope.logout = function(){
       var isLogout = confirm('Are you sure you want to log out?');
       if(isLogout){
         $rootScope.isVerified == false;
         coreService.removeLocalStorage('lookupData');
         coreService.removeLocalStorage('applicantData')
         $location.path('/');
       }
     };
     $scope.next = function(){
       this.stepValidMsg = {};
       //init
       this.stepValid = true;
       this.CourseErr = false;
       this.StudyOfModeErr = false;
       this.ApplyRPLErr = false;
       this.ApplyCreditTransferErr = false
       this.StudyReasonErr = false;
       this.OtherStudyReasonErr = false;
       this.PassYear10EnglishErr = false;
       this.CompleteEnglishTestErr = false;
       this.IELTSScoreErr = false;
       //validate step 5
       if(this.CourseID === undefined || this.CourseID === null){
         this.CourseErr = true;
         this.stepValid = false;
       }
       this.ModeOfStudyList.arr = [];
       for(var key in this.ModeOfStudyList.ids) {
           var value = this.ModeOfStudyList.ids[key];
           if(value){
             this.ModeOfStudyList.arr.push(key);
           }
       }
       if(this.ModeOfStudyList.arr.length <= 0){
         this.StudyOfModeErr = true;
         this.stepValid = false;
       }
       if(this.ApplyRPL === undefined){
         this.ApplyRPLErr = true;
         this.stepValid = false;
       }
       if(this.ApplyCreditTransfer === undefined || this.ApplyCreditTransfer === null){
         this.ApplyCreditTransferErr = true;
         this.stepValid = false;
       }
       if(this.StudyReason === undefined || this.StudyReason === null){
         this.StudyReasonErr = true;
         this.stepValid = false;
       }
       if(this.StudyReason === '10' && (this.OtherStudyReason === null || this.OtherStudyReason === '')){
         this.OtherStudyReasonErr = true;
         this.stepValid = false;
       }
       if(coreFactory.translateBoolean(this.PassYear10English) === '0' && coreFactory.translateBoolean(this.CompleteEnglishTest) === '0'){
         this.PassYear10EnglishErr = true;
         this.CompleteEnglishTestErr = true;
         this.stepValid = false;
       }
       if(coreFactory.translateBoolean(this.CompleteEnglishTest) === '1' && (this.IELTSScore === null || this.IELTSScore === '')){
         this.IELTSScoreErr = true;
         this.stepValid = false;
       }

       $('body').scrollTop(0);
       if(this.stepValid){
         //POST
         console.log('PassYear10English', this.PassYear10English);
         console.log('CompleteEnglishTest', this.CompleteEnglishTest);
         var step5Data = {"PassKey": settingFactory.passKey, "ApplicantID": this.ApplicantId, "CourseID": parseInt(this.CourseID), "ModeOfStudy": this.ModeOfStudyList.arr, "ApplyRPL": parseInt(this.ApplyRPL), "ApplyCreditTransfer": parseInt(this.ApplyCreditTransfer), "StudyReason": parseInt(this.StudyReason), "OtherStudyReason": this.OtherStudyReason, "PassYear10English": parseInt(coreFactory.translateBoolean(this.PassYear10English)), "CompleteEnglishTest": parseInt(coreFactory.translateBoolean(this.CompleteEnglishTest)), "IELTSScore": this.IELTSScore};
         console.log(step5Data);
         coreFactory.postData(settingFactory.step5URL, step5Data, 'step5');
       }
     }
});
