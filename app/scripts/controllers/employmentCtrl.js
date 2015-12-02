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
     if(coreFactory.applicantData.ApplicantId){
       $scope.ApplicantId = coreFactory.applicantData.ApplicantId;
       $scope.HasAgreeTermAtBeginning = coreFactory.translateDigit(coreFactory.applicantData.HasAgreeTermAtBeginning);
       $scope.Title = coreFactory.applicantData.Title;
       $scope.FamilyName = coreFactory.applicantData.FamilyName;
       $scope.GivenName = coreFactory.applicantData.GivenName;
       $scope.PreferredName = coreFactory.applicantData.PreferredName;
       var dataDOB = new Date(coreFactory.applicantData.DateOfBirth);
       var ddDOB = parseInt(dataDOB.getDate())>10? dataDOB.getDate() :'0'+dataDOB.getDate();
       var mmDOB = parseInt(dataDOB.getMonth())+1>10? dataDOB.getMonth() :'0'+(parseInt(dataDOB.getMonth())+1);
       var yyyyDOB = dataDOB.getFullYear();
       $scope.DateOfBirth = ddDOB+'/'+mmDOB+'/'+yyyyDOB;
       $(".DateOfBirth").datepicker("update", new Date(coreFactory.applicantData.DateOfBirth));
       $scope.Gender = coreFactory.applicantData.Gender;
       $scope.HomePhone = coreFactory.applicantData.HomePhone;
       $scope.MobilePhone = coreFactory.applicantData.MobilePhone;
       $scope.WorkPhone = coreFactory.applicantData.WorkPhone;
       $scope.UserId = coreFactory.applicantData.Email;
       $scope.HomeAddressLine1 = coreFactory.applicantData.HomeAddressLine1;
       $scope.HomeAddressLine2 = coreFactory.applicantData.HomeAddressLine2;
       $scope.HomeSuburb = coreFactory.applicantData.HomeSuburb;
       $scope.HomeState = coreFactory.applicantData.HomeState;
       $scope.HomePostCode = parseInt(coreFactory.applicantData.HomePostCode);
       $scope.PostalAddressLine1 = coreFactory.applicantData.PostalAddressLine1;
       $scope.PostalAddressLine2 = coreFactory.applicantData.PostalAddressLine2;
       $scope.PostalSuburb = coreFactory.applicantData.PostalSuburb;
       $scope.PostalState = coreFactory.applicantData.PostalState;
       $scope.PostalPostCode = parseInt(coreFactory.applicantData.PostalPostCode);
       $scope.PreferredMailType = coreFactory.applicantData.PreferredMailType;
       $scope.HasUSI = coreFactory.translateBoolean(coreFactory.applicantData.HasUSI);
       $scope.USI = coreFactory.applicantData.USI;
       $scope.HasConcessionCard = coreFactory.translateBoolean(coreFactory.applicantData.HasConcessionCard);
       $scope.ConcessionCardType = coreFactory.applicantData.ConcessionCardType;
       $scope.ConcessionCardNumber = coreFactory.applicantData.ConcessionCardNumber;
       $scope.ConcessionCardName = coreFactory.applicantData.ConcessionCardName;
       var dataConcessionCardExpiryDate = new Date(coreFactory.applicantData.ConcessionCardExpiryDate);
       var ddConcessionCardExpiryDate = parseInt(dataConcessionCardExpiryDate.getDate())>10? dataConcessionCardExpiryDate.getDate() :'0'+dataConcessionCardExpiryDate.getDate();
       var mmConcessionCardExpiryDate = parseInt(dataConcessionCardExpiryDate.getMonth())+1>10? dataConcessionCardExpiryDate.getMonth() :'0'+(parseInt(dataConcessionCardExpiryDate.getMonth())+1);
       var yyyyConcessionCardExpiryDate = dataConcessionCardExpiryDate.getFullYear();
       $scope.ConcessionCardExpiryDate = ddConcessionCardExpiryDate+'/'+mmConcessionCardExpiryDate+'/'+yyyyConcessionCardExpiryDate;
       $(".ConcessionCardExpiryDate").datepicker("update", new Date(coreFactory.applicantData.ConcessionCardExpiryDate));
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
       this.HasAgreeTermAtBeginningErr = false;
       this.TitlesErr = false;
       this.DateOfBirthErr = false;
       this.GenderErr = false
       this.MobilePhoneErr = false;
       this.WorkPhoneErr = false;
       this.HomeAddressLine1Err = false;
       this.HomeSuburbErr = false;
       this.HomePostCodeErr = false;
       this.PostalAddressLine1Err = false;
       this.PostalSuburbErr = false;
       this.PostalPostCodeErr = false;
       this.PreferredMailTypeErr = false;
       this.HasUSIErr = false;
       this.USIErr = false;
       this.HasConcessionCardErr = false;
       this.ConcessionCardNumberErr = false;
       this.ConcessionCardNameErr = false;
       this.ConcessionCardExpiryDateErr = false;
       //validate step 1
       if(coreFactory.translateBoolean(this.HasAgreeTermAtBeginning) === 0){
         this.stepValidMsg['Agree terms:'] = "Please tick [Agree] terms";
         this.HasAgreeTermAtBeginningErr = true;
         this.stepValid = false;
       }
       if(this.Title === undefined){
         this.stepValidMsg['Title:'] = "Please select your [Title]";
         this.TitlesErr = true;
         this.stepValid = false;
       }
       if(!coreFactory.UTCTime(this.DateOfBirth) || !coreFactory.ispastDate(this.DateOfBirth)){
         this.stepValidMsg['DOB:'] = "Please select your [Date of Birth]";
         this.DateOfBirthErr = true;
         this.stepValid = false;
       }
       if(this.Gender === undefined){
         this.stepValidMsg['Gender:'] = "Please select your [Gender]";
         this.GenderErr = true;
         this.stepValid = false;
       }
       if(this.MobilePhone === undefined || this.MobilePhone === ''){
         this.stepValidMsg['MobilePhone:'] = "Please provide your [MobilePhone]";
         this.MobilePhoneErr = true;
         this.stepValid = false;
       }
       if(this.WorkPhone === undefined || this.WorkPhone === ''){
         this.stepValidMsg['WorkPhone:'] = "Please provide your [WorkPhone]";
         this.WorkPhoneErr = true;
         this.stepValid = false;
       }
       if(this.HomeAddressLine1 === undefined || this.HomeAddressLine1 === ''){
         this.stepValidMsg['Home Address Line1:'] = "Please provide your [Home Address Line 1]";
         this.HomeAddressLine1Err = true;
         this.stepValid = false;
       }
       if(this.HomeSuburb === undefined || this.HomeSuburb === ''){
         this.stepValidMsg['Home Suburb:'] = "Please provide your [Home Suburb]";
         this.HomeSuburbErr = true;
         this.stepValid = false;
       }
       if(this.HomePostCode === undefined || this.HomePostCode === ''){
         this.stepValidMsg['Home Postcode:'] = "Please provide your [Home Postcode]";
         this.HomePostCodeErr = true;
         this.stepValid = false;
       }
       if(this.PostalAddressLine1 === undefined || this.PostalAddressLine1 === ''){
         this.stepValidMsg['Postal Address Line1:'] = "Please provide your [Postal Address Line 1]";
         this.PostalAddressLine1Err = true;
         this.stepValid = false;
       }
       if(this.PostalSuburb === undefined || this.PostalSuburb === ''){
         this.stepValidMsg['Postal Suburb:'] = "Please provide your [Postal Suburb]";
         this.PostalSuburbErr = true;
         this.stepValid = false;
       }
       if(this.PostalPostCode === undefined || this.PostalPostCode === ''){
         this.stepValidMsg['Postal Postcode:'] = "Please provide your [Postal Postcode]";
         this.PostalPostCodeErr = true;
         this.stepValid = false;
       }
       if(this.PreferredMailType === undefined){
         this.stepValidMsg['Prefered Mail Type:'] = "Please provide your [Prefered Mail Type]";
         this.PreferredMailTypeErr = true;
         this.stepValid = false;
       }
       if(this.HasUSI === undefined){
         this.stepValidMsg['Has USI:'] = "Please check if you have [USI]";
         this.HasUSIErr = true;
         this.stepValid = false;
       }
       if(coreFactory.translateBoolean(this.HasUSI) === 1 && (this.USI === undefined || this.USI === '')){
         this.stepValidMsg['USI:'] = "Please provide you [USI]";
         this.USIErr = true;
         this.stepValid = false;
       }
       if(this.HasConcessionCard === undefined){
         this.stepValidMsg['Has Concession Card:'] = "Please check if you have [Concession Card]";
         this.HasConcessionCardErr = true;
         this.stepValid = false;
       }
       if(this.HasConcessionCard === '1' && (this.ConcessionCardNumber === undefined || this.ConcessionCardNumber === '')){
         this.stepValidMsg['Concession Card Number:'] = "Please provide you [Concession Card Number]";
         this.ConcessionCardNumberErr = true;
         this.stepValid = false;
       }
       if(this.HasConcessionCard === '1' && (this.ConcessionCardName === undefined || this.ConcessionCardName === '')){
         this.stepValidMsg['Name on Card:'] = "Please provide you [Name on Card]";
         this.ConcessionCardNameErr = true;
         this.stepValid = false;
       }
       if(this.HasConcessionCard === '1' && (!coreFactory.UTCTime(this.ConcessionCardExpiryDate) || coreFactory.ispastDate(this.ConcessionCardExpiryDate))){
         this.stepValidMsg['Concession Card Expiry Date:'] = "Please check your [Concession Card Expiry Date]";
         this.ConcessionCardExpiryDateErr = true;
         this.stepValid = false;
       }
       if(this.stepValid){
         //POST
         var step3Data = {"PassKey": settingFactory.passKey, "ApplicantID": this.ApplicantId, "EmploymentStatus": parseInt(this.EmploymentStatus), "StillAttendSecondarySchool": this.StillAttendSecondarySchool, "PreferredName": this.PreferredName, "NameofSecondarySchool": this.NameofSecondarySchool, "QLDSchoolLeaver": this.QLDSchoolLeaver, "LUI": this.LUI, "CompletedSchoolLevel": this.CompletedSchoolLevel, "CompletedSchoolYear": this.CompletedSchoolYear, "UploadYear12Certification": this.UploadYear12Certification, "CompletedFormalQual": this.CompletedFormalQual, "QualificationAchieved": this.QualificationAchieved, "QualificationTitleAchieved": this.QualificationTitleAchieved, "QualificationAchievedYear": this.QualificationAchievedYear, "QualificationType": this.QualificationType, "EnrolledNationallyRecognizedCourse": this.EnrolledNationallyRecognizedCourse, "CourseEnrolledIn": this.CourseEnrolledIn, "QualificationTitle": this.QualificationTitle, "Unemployed": this.Unemployed,"EmployerLegalName":this.EmployerLegalName, "EmployerTradingName": this.EmployerTradingName, "EmployerAddress1": this.EmployerAddress1, "EmployerAddress2": this.EmployerAddress2, "EmployerSuburb": this.EmployerSuburb, "EmployerState": parseInt(this.EmployerState), "EmployerPostcode": this.EmployerPostcode, "EmployerPhone": this.EmployerPhone, "EmployerFax": this.EmployerFax, "EmployerEmail": this.EmployerEmail,"EmployerContactPerson": this.EmployerContactPerson,"CurrentlyHasRelevantWork": this.CurrentlyHasRelevantWork,"HowLongWork": this.HowLongWork,"CurrentPosition": this.CurrentPosition,"WhenLastWork": this.WhenLastWork,"QLDChildcare": this.QLDChildcare,"UploadBlueCard": this.UploadBlueCard,"NSWChildcare": this.NSWChildcare,"UploadChildrenCheck": this.UploadChildrenCheck,"AgeCare": this.AgeCare,"UploadCriminalHistoryCheck": this.UploadCriminalHistoryCheck};
         coreFactory.postData(settingFactory.step3URL, step3Data, 'step3');

       }
     }
});
