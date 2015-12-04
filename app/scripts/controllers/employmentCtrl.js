'use strict';

/**
 * @ngdoc function
 * @name tlcApp.controller:EmploymentCtrl
 * @description
 * # EmploymentCtrl
 * Controller of the tlcApp
 */
angular.module('tlcApp')
   .controller('EmploymentCtrl', function ($rootScope, $scope, $location, settingFactory, coreService, coreFactory) {
     $scope.coreFactory = coreFactory;
     if(!$rootScope.isVerified){
       //if user not verifed, redirect to login page
       //$location.path('/');
     }
     $scope.lookupData = coreService.ParseJSON(coreService.getLocalStorage('lookupData'));
     console.log($scope.lookupData);
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
     if(coreFactory.applicantData.ApplicantId){
       console.log(coreFactory.applicantData);
       $scope.ApplicantId = coreFactory.applicantData.ApplicantId;
       $scope.EmploymentStatus = coreFactory.applicantData.EmploymentStatus;
       $scope.StillAttendSecondarySchool = coreFactory.translateDigit(coreFactory.applicantData.StillAttendSecondarySchool);
       $scope.NameofSecondarySchool = coreFactory.applicantData.NameofSecondarySchool;
       $scope.QLDSchoolLeaver = coreFactory.translateDigit(coreFactory.applicantData.QLDSchoolLeaver);
       $scope.LUI = coreFactory.applicantData.LUI;
       $scope.CompletedSchoolLevel = coreFactory.applicantData.CompletedSchoolLevel;
       //console.log(new Date('01/01/'+coreFactory.applicantData.CompletedSchoolYear));
       $(".schoolyear").datepicker(' update ', new Date('01/01/'+coreFactory.applicantData.CompletedSchoolYear));
       $scope.CompletedSchoolYear = coreFactory.applicantData.CompletedSchoolYear;
       $scope.UploadYear12Certification = coreFactory.translateDigit(coreFactory.applicantData.UploadYear12Certification);
       $scope.CompletedFormalQualification = coreFactory.translateDigit(coreFactory.applicantData.CompletedFormalQualification);
       $scope.QualificationAchieved = coreFactory.applicantData.QualificationAchieved;
       $scope.QualificationTitleAchieved = coreFactory.applicantData.QualificationTitleAchieved;
       $(".qualificationyear").datepicker("update", new Date('01/01/'+coreFactory.applicantData.QualificationAchievedYear));
       $scope.QualificationAchievedYear = coreFactory.applicantData.QualificationAchievedYear;
       $scope.QualificationType = coreFactory.applicantData.QualificationType;
       $scope.EnrolledNationallyRecognizedCourse = coreFactory.translateDigit(coreFactory.applicantData.EnrolledNationallyRecognizedCourse);
       $scope.CourseEnrolledIn = coreFactory.applicantData.CourseEnrolledIn;
       $scope.QualificationTitle = coreFactory.applicantData.QualificationTitle;
       $scope.Unemployed = coreFactory.translateDigit(coreFactory.translateDigit(coreFactory.applicantData.Unemployed));
       $scope.EmployerLegalName = coreFactory.applicantData.EmployerLegalName;
       $scope.EmployerTradingName = coreFactory.applicantData.EmployerTradingName;
       $scope.EmployerAddress1 = coreFactory.applicantData.EmployerAddress1;
       $scope.EmployerAddress2 = coreFactory.applicantData.EmployerAddress2;
       $scope.EmployerSuburb = coreFactory.applicantData.EmployerSuburb;
       $scope.EmployerState = coreFactory.applicantData.EmployerState;
       $scope.EmployerPostcode = parseInt(coreFactory.applicantData.EmployerPostcode);
       $scope.EmployerPhone = coreFactory.applicantData.EmployerPhone;
       $scope.EmployerFax = coreFactory.applicantData.EmployerFax;
       $scope.EmployerEmail = coreFactory.applicantData.EmployerEmail;
       $scope.EmployerContactPerson = coreFactory.applicantData.EmployerContactPerson;
       $scope.CurrentlyHasRelevantWork = coreFactory.translateBoolean(coreFactory.applicantData.CurrentlyHasRelevantWork);
       $scope.HowLongWork = coreFactory.applicantData.HowLongWork;
       $scope.CurrentPosition = coreFactory.applicantData.CurrentPosition;
       $(".lastworkyear").datepicker("update", new Date('01/01/'+coreFactory.applicantData.WhenLastWork));
       $scope.WhenLastWork = coreFactory.applicantData.WhenLastWork;
       $scope.QLDChildcare = coreFactory.translateDigit(coreFactory.applicantData.QLDChildcare);
       $scope.UploadBlueCard = coreFactory.translateDigit(coreFactory.applicantData.UploadBlueCard);
       $scope.NSWChildcare = coreFactory.translateDigit(coreFactory.applicantData.NSWChildcare);
       $scope.UploadChildrenCheck = coreFactory.translateDigit(coreFactory.applicantData.UploadChildrenCheck);
       $scope.AgeCare = coreFactory.translateDigit(coreFactory.applicantData.AgeCare);
       $scope.UploadCriminalHistoryCheck = coreFactory.translateDigit(coreFactory.applicantData.UploadCriminalHistoryCheck);
     }
     $scope.checkEmail = function(){
       this.EmployerEmailErr = !coreFactory.validateEmail(this.EmployerEmail);
     }
     $scope.prev = function(){
       $location.path('/personal');
     }
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
       console.log(this.HowLongWork);
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

       if(this.stepValid){
         //POST
         var step3Data = {"PassKey": settingFactory.passKey, "ApplicantID": this.ApplicantId, "EmploymentStatus": this.EmploymentStatus, "StillAttendSecondarySchool": parseInt(this.StillAttendSecondarySchool), "NameofSecondarySchool": this.NameofSecondarySchool, "QLDSchoolLeaver": parseInt(this.QLDSchoolLeaver), "LUI": this.LUI, "CompletedSchoolLevel": parseInt(this.CompletedSchoolLevel), "CompletedSchoolYear": parseInt(this.CompletedSchoolYear), "UploadYear12Certification": parseInt(this.UploadYear12Certification), "CompletedFormalQualification": parseInt(this.CompletedFormalQualification), "QualificationAchieved": parseInt(this.QualificationAchieved), "QualificationTitleAchieved": this.QualificationTitleAchieved, "QualificationAchievedYear": this.QualificationAchievedYear, "QualificationType": parseInt(this.QualificationType), "EnrolledNationallyRecognizedCourse": parseInt(this.EnrolledNationallyRecognizedCourse), "CourseEnrolledIn": parseInt(this.CourseEnrolledIn), "QualificationTitle": this.QualificationTitle, "Unemployed": parseInt(this.Unemployed),"EmployerLegalName":this.EmployerLegalName, "EmployerTradingName": this.EmployerTradingName, "EmployerAddress1": this.EmployerAddress1, "EmployerAddress2": this.EmployerAddress2, "EmployerSuburb": this.EmployerSuburb, "EmployerState": parseInt(this.EmployerState), "EmployerPostcode": this.EmployerPostcode, "EmployerPhone": this.EmployerPhone, "EmployerFax": this.EmployerFax, "EmployerEmail": this.EmployerEmail,"EmployerContactPerson": this.EmployerContactPerson,"CurrentlyHasRelevantWork": parseInt(this.CurrentlyHasRelevantWork),"HowLongWork": this.HowLongWork,"CurrentPosition": this.CurrentPosition,"WhenLastWork": this.WhenLastWork,"QLDChildcare": parseInt(this.QLDChildcare),"UploadBlueCard": parseInt(this.UploadBlueCard),"NSWChildcare": parseInt(this.NSWChildcare),"UploadChildrenCheck": parseInt(this.UploadChildrenCheck),"AgeCare": parseInt(this.AgeCare),"UploadCriminalHistoryCheck": parseInt(this.UploadCriminalHistoryCheck)};
         coreFactory.postData(settingFactory.step3URL, step3Data, 'step3');

       }
     }
});
