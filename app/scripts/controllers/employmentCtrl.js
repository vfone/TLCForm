'use strict';

/**
 * @ngdoc function
 * @name tlcApp.controller:EmploymentCtrl
 * @description
 * # EmploymentCtrl
 * Controller of the tlcApp
 */
angular.module('tlcApp')
   .controller('EmploymentCtrl', function ($rootScope, $scope, $location, $window, settingFactory, coreService, coreFactory) {
     $scope.coreFactory = coreFactory;
     if(!$rootScope.isVerified){
       //if user not verifed, redirect to login page
       $location.path('/');
     }
     $scope.lookupData = coreService.ParseJSON(coreService.getLocalStorage('lookupData'));
     //console.log($scope.lookupData);
     $scope.EmploymentStatuses = $scope.lookupData.EmploymentStatuses;
     $scope.CompletedSchoolYears= $scope.lookupData.CompletedSchoolYears;
     $scope.Qualifications = $scope.lookupData.Qualifications;
     $scope.QualificationTypes = $scope.lookupData.QualificationTypes;
     $scope.EnrolledCourses = $scope.lookupData.EnrolledCourses;
     $scope.EmploymentStatuses = $scope.lookupData.EmploymentStatuses;
     $scope.EnrolledCourses = $scope.lookupData.EnrolledCourses;
     $scope.States = $scope.lookupData.States;
     $scope.EmployerState = $scope.States[0].StateId;
     $scope.stepValid = true;
     $scope.stepValidMsg = {};
     if($.isEmptyObject(coreFactory.applicantData)){
       coreFactory.applicantData = coreService.ParseJSON(coreService.getLocalStorage('applicantData'));
     }
     if(coreFactory.applicantData){
       //console.log(coreFactory.applicantData);
       $scope.ApplicantId = coreFactory.applicantData.ApplicantId;
       $scope.EmploymentStatus = coreFactory.applicantData.EmploymentStatus || undefined;
       $scope.StillAttendSecondarySchool = coreFactory.translateBoolean(coreFactory.applicantData.StillAttendSecondarySchool);
       $scope.NameofSecondarySchool = coreFactory.applicantData.NameofSecondarySchool || undefined;
       $scope.QLDSchoolLeaver = coreFactory.translateBoolean(coreFactory.applicantData.QLDSchoolLeaver);
       $scope.LUI = coreFactory.applicantData.LUI || undefined;
       $scope.CompletedSchoolLevel = coreFactory.applicantData.CompletedSchoolLevel || undefined;
       //console.log(new Date('01/01/'+coreFactory.applicantData.CompletedSchoolYear));
       $(".schoolyear").datepicker('update', new Date('01/01/'+coreFactory.applicantData.CompletedSchoolYear||'2015'));
       $scope.CompletedSchoolYear = coreFactory.applicantData.CompletedSchoolYear || '';
       $scope.UploadYear12Certification = coreFactory.translateBoolean(coreFactory.applicantData.UploadYear12Certification);
       $scope.CompletedFormalQualification = coreFactory.translateBoolean(coreFactory.applicantData.CompletedFormalQualification);
       $scope.QualificationAchieved = coreFactory.applicantData.QualificationAchieved || undefined;
       $scope.QualificationTitleAchieved = coreFactory.applicantData.QualificationTitleAchieved || undefined;
       $(".qualificationyear").datepicker('update', new Date('01/01/'+coreFactory.applicantData.QualificationAchievedYear || '2015'));
       $scope.QualificationAchievedYear = coreFactory.applicantData.QualificationAchievedYear || '';
       $scope.QualificationType = coreFactory.applicantData.QualificationType || undefined;
       $scope.EnrolledNationallyRecognizedCourse = coreFactory.translateBoolean(coreFactory.applicantData.EnrolledNationallyRecognizedCourse);
       $scope.CourseEnrolledIn = coreFactory.applicantData.CourseEnrolledIn || undefined;
       $scope.QualificationTitle = coreFactory.applicantData.QualificationTitle || undefined;
       $scope.Unemployed = coreFactory.applicantData.Unemployed || undefined;
       $scope.EmployerLegalName = coreFactory.applicantData.EmployerLegalName || undefined;
       $scope.EmployerTradingName = coreFactory.applicantData.EmployerTradingName || undefined;
       $scope.EmployerAddress1 = coreFactory.applicantData.EmployerAddress1 || undefined;
       $scope.EmployerAddress2 = coreFactory.applicantData.EmployerAddress2 || undefined;
       $scope.EmployerSuburb = coreFactory.applicantData.EmployerSuburb || undefined;
       $scope.EmployerState = coreFactory.applicantData.EmployerState || 1;
       $scope.EmployerPostcode = coreFactory.applicantData.EmployerPostcode || undefined;
       $scope.EmployerPhone = coreFactory.applicantData.EmployerPhone || undefined;
       $scope.EmployerFax = coreFactory.applicantData.EmployerFax || undefined;
       $scope.EmployerEmail = coreFactory.applicantData.EmployerEmail || undefined;
       $scope.EmployerContactPerson = coreFactory.applicantData.EmployerContactPerson || undefined;
       $scope.CurrentlyHasRelevantWork = coreFactory.translateBoolean(coreFactory.applicantData.CurrentlyHasRelevantWork);
       $scope.HowLongWork = coreFactory.applicantData.HowLongWork || undefined;
       $scope.CurrentPosition = coreFactory.applicantData.CurrentPosition || undefined;
       $(".lastworkyear").datepicker("update", new Date('01/01/'+coreFactory.applicantData.WhenLastWork)||'2015');
       $scope.WhenLastWork = coreFactory.applicantData.WhenLastWork || '';
       $scope.QLDChildcare = coreFactory.translateBoolean(coreFactory.applicantData.QLDChildcare);
       $scope.UploadBlueCard = coreFactory.translateBoolean(coreFactory.applicantData.UploadBlueCard);
       $scope.NSWChildcare = coreFactory.translateBoolean(coreFactory.applicantData.NSWChildcare);
       $scope.UploadChildrenCheck = coreFactory.translateBoolean(coreFactory.applicantData.UploadChildrenCheck);
       $scope.AgeCare = coreFactory.translateBoolean(coreFactory.applicantData.AgeCare);
       $scope.UploadCriminalHistoryCheck = coreFactory.translateBoolean(coreFactory.applicantData.UploadCriminalHistoryCheck);
     }
     $scope.checkEmail = function(){
       this.EmployerEmailErr = !coreFactory.validateEmail(this.EmployerEmail);
     }
     $scope.prev = function(){
       $location.path('/personal');
     }
     $scope.logout = function(){
       var isLogout = confirm('Are you sure you want to log out?');
       if(isLogout){
         $rootScope.isVerified == false;
         coreService.removeLocalStorage('lookupData');
         coreService.removeLocalStorage('applicantData');
         $window.location.reload();
         $location.path('/');
       }
     };
     $scope.next = function(){
       this.stepValidMsg = {};
       //init
       this.stepValid = true;
       this.EmploymentStatusErr = false;
       this.StillAttendSecondarySchoolErr = false;
       this.NameofSecondarySchoolErr = false;
       this.QLDSchoolLeaverErr = false
       this.LUIErr = false;
       this.CompletedSchoolLevelErr = false;
       this.UploadYear12CertificationErr = false;
       this.CompletedFormalQualificationErr = false;
       this.QualificationAchievedErr = false;
       this.QualificationTitleAchievedErr = false;
       this.QualificationAchievedYearErr = false;
       this.QualificationTypeErr = false;
       this.EnrolledNationallyRecognizedCourseErr = false;
       this.CourseEnrolledInErr = false;
       this.QualificationTitleErr = false;
       this.UnemployedErr = false;
       this.EmployerTradingNameErr = false;
       this.EmployerAddressErr = false;
       this.EmployerSuburbErr = false;
       this.EmployerStateErr = false;
       this.EmployerPostcodeErr = false;
       this.EmployerPhoneErr = false;
       this.EmployerEmailErr = false;
       this.EmployerContactPersonErr = false;
       this.CurrentlyHasRelevantWorkErr = false;
       this.HowLongWorkErr = false;
       this.CurrentPositionErr = false;
       this.WhenLastWorkErr = false;
       this.QLDChildcareErr = false;
       this.UploadBlueCardErr = false;
       this.NSWChildcareErr = false;
       this.UploadChildrenCheckErr = false;
       this.AgeCareErr = false;
       this.UploadCriminalHistoryCheckErr = false;

       //validate step 2
       if(this.EmploymentStatus === undefined){
         this.EmploymentStatusErr = true;
         this.stepValid = false;
       }
       if(this.StillAttendSecondarySchool === undefined){
         this.StillAttendSecondarySchoolErr = true;
         this.stepValid = false;
       }
       if(this.StillAttendSecondarySchool === "1" && (this.NameofSecondarySchool === undefined ||this.NameofSecondarySchool === '')){
         this.NameofSecondarySchoolErr = true;
         this.stepValid = false;
       }
       if(this.QLDSchoolLeaver === undefined){
         this.QLDSchoolLeaverErr = true;
         this.stepValid = false;
       }
       if(this.QLDSchoolLeaver === "1" && (this.LUI === undefined ||this.LUI === '')){
         this.LUIErr = true;
         this.stepValid = false;
       }
       if(this.CompletedSchoolLevel === undefined){
         this.CompletedSchoolLevelErr = true;
         this.stepValid = false;
       }
       if(this.CompletedSchoolLevel === "1" && this.UploadYear12Certification !== true){
         this.UploadYear12CertificationErr = true;
         this.stepValid = false;
       }
       if(this.CompletedFormalQualification === undefined){
         this.CompletedFormalQualificationErr = true;
         this.stepValid = false;
       }
       if(this.CompletedFormalQualification === "1" && this.QualificationAchieved === undefined){
         this.QualificationAchievedErr = true;
         this.stepValid = false;
       }
       if(this.CompletedFormalQualification === "1" && (this.QualificationTitleAchieved === undefined || this.QualificationTitleAchieved === '')){
         this.QualificationTitleAchievedErr = true;
         this.stepValid = false;
       }
       if(this.CompletedFormalQualification === "1" && (this.QualificationAchievedYear === undefined || this.QualificationAchievedYear === '' || coreFactory.isFutureYear(this.QualificationAchievedYear))){
         this.QualificationAchievedYearErr = true;
         this.stepValid = false;
       }
       if(this.CompletedFormalQualification === "1" && this.QualificationType === undefined){
         this.QualificationTypeErr = true;
         this.stepValid = false;
       }
       if(this.EnrolledNationallyRecognizedCourse === undefined){
         this.EnrolledNationallyRecognizedCourseErr = true;
         this.stepValid = false;
       }
       if(this.EnrolledNationallyRecognizedCourse === "1" && this.CourseEnrolledIn === undefined){
         this.CourseEnrolledInErr = true;
         this.stepValid = false;
       }
       if(this.EnrolledNationallyRecognizedCourse === "1" && (this.QualificationTitle === undefined || this.QualificationTitle === '')){
         this.QualificationTitleErr = true;
         this.stepValid = false;
       }
       if(this.Unemployed === false && (this.EmployerTradingName === undefined || this.EmployerTradingName === '')){
         this.EmployerTradingNameErr = true;
         this.stepValid = false;
       }
       if(this.Unemployed === false && (this.EmployerAddress1 === undefined || this.EmployerAddress1 === '')){
         this.EmployerAddress1Err = true;
         this.stepValid = false;
       }
       if(this.Unemployed === false && (this.EmployerSuburb === undefined || this.EmployerSuburb === '')){
         this.EmployerSuburbErr = true;
         this.stepValid = false;
       }
       if(this.Unemployed === false && (this.EmployerPostcode === undefined || this.EmployerPostcode === '')){
         this.EmployerPostcodeErr = true;
         this.stepValid = false;
       }
       if(this.Unemployed === false && (this.EmployerPhone === undefined || this.EmployerPhone === '')){
         this.EmployerPhoneErr = true;
         this.stepValid = false;
       }
       if(this.Unemployed === false && (this.EmployerEmail === undefined || this.EmployerEmail === '' || this.checkEmail())){
         this.EmployerEmailErr = true;
         this.stepValid = false;
       }
       if(this.Unemployed === false && (this.EmployerContactPerson === undefined || this.EmployerContactPerson === '')){
         this.EmployerContactPersonErr = true;
         this.stepValid = false;
       }
       if(this.CurrentlyHasRelevantWork === undefined){
         this.CurrentlyHasRelevantWorkErr = true;
         this.stepValid = false;
       }
       //console.log(this.HowLongWork);
       if(this.CurrentlyHasRelevantWork === '1' && (this.HowLongWork === undefined || this.HowLongWork === '')){
         this.HowLongWorkErr = true;
         this.stepValid = false;
       }
       if(this.CurrentlyHasRelevantWork === '1' && (this.CurrentPosition === undefined || this.CurrentPosition === '')){
         this.CurrentPositionErr = true;
         this.stepValid = false;
       }
       if(this.CurrentlyHasRelevantWork === '0' && (this.WhenLastWork === undefined || this.WhenLastWork === ''|| coreFactory.isFutureYear(this.WhenLastWork))){
         this.WhenLastWorkErr = true;
         this.stepValid = false;
       }
       if(this.QLDChildcare === undefined){
         this.QLDChildcareErr = true;
         this.stepValid = false;
       }
       if(this.QLDChildcare === '1' && this.UploadBlueCard === undefined){
         this.UploadBlueCardErr = true;
         this.stepValid = false;
       }
       if(this.NSWChildcare === undefined){
         this.NSWChildcareErr = true;
         this.stepValid = false;
       }
       if(this.NSWChildcare === '1' && this.UploadChildrenCheck === undefined){
         this.UploadChildrenCheckErr = true;
         this.stepValid = false;
       }
       if(this.AgeCare === undefined){
         this.AgeCareErr = true;
         this.stepValid = false;
       }
       if(this.AgeCare === '1' && this.UploadCriminalHistoryCheck === undefined){
         this.UploadCriminalHistoryCheckErr = true;
         this.stepValid = false;
       }
       $('body').scrollTop(0);
       if(this.stepValid){
         //POST
         var step3Data = {"PassKey": settingFactory.passKey, "ApplicantID": this.ApplicantId, "EmploymentStatus": this.EmploymentStatus, "StillAttendSecondarySchool": parseInt(this.StillAttendSecondarySchool), "NameofSecondarySchool": this.NameofSecondarySchool, "QLDSchoolLeaver": parseInt(this.QLDSchoolLeaver), "LUI": this.LUI, "CompletedSchoolLevel": parseInt(this.CompletedSchoolLevel), "CompletedSchoolYear": parseInt(this.CompletedSchoolYear), "UploadYear12Certification": parseInt(this.UploadYear12Certification), "CompletedFormalQualification": parseInt(this.CompletedFormalQualification), "QualificationAchieved": parseInt(this.QualificationAchieved), "QualificationTitleAchieved": this.QualificationTitleAchieved, "QualificationAchievedYear": this.QualificationAchievedYear, "QualificationType": parseInt(this.QualificationType), "EnrolledNationallyRecognizedCourse": parseInt(this.EnrolledNationallyRecognizedCourse), "CourseEnrolledIn": parseInt(this.CourseEnrolledIn), "QualificationTitle": this.QualificationTitle, "Unemployed": parseInt(coreFactory.translateBoolean(this.Unemployed)),"EmployerLegalName":this.EmployerLegalName, "EmployerTradingName": this.EmployerTradingName, "EmployerAddress1": this.EmployerAddress1, "EmployerAddress2": this.EmployerAddress2, "EmployerSuburb": this.EmployerSuburb, "EmployerState": parseInt(this.EmployerState), "EmployerPostcode": this.EmployerPostcode, "EmployerPhone": this.EmployerPhone, "EmployerFax": this.EmployerFax, "EmployerEmail": this.EmployerEmail,"EmployerContactPerson": this.EmployerContactPerson,"CurrentlyHasRelevantWork": parseInt(this.CurrentlyHasRelevantWork),"HowLongWork": this.HowLongWork,"CurrentPosition": this.CurrentPosition,"WhenLastWork": this.WhenLastWork,"QLDChildcare": parseInt(this.QLDChildcare),"UploadBlueCard": parseInt(this.UploadBlueCard),"NSWChildcare": parseInt(this.NSWChildcare),"UploadChildrenCheck": parseInt(this.UploadChildrenCheck),"AgeCare": parseInt(this.AgeCare),"UploadCriminalHistoryCheck": parseInt(this.UploadCriminalHistoryCheck)};
         coreFactory.postData(settingFactory.step3URL, step3Data, 'step3');
       }
     }
});
