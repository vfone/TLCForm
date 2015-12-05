'use strict';

/**
 * @ngdoc function
 * @name tlcApp.controller:PersonalCtrl
 * @description
 * # PersonalCtrl
 * Controller of the tlcApp
 */
angular.module('tlcApp')
   .controller('PersonalCtrl', function ($rootScope, $scope, $location, settingFactory, $window, coreService, coreFactory) {
     $scope.coreFactory = coreFactory;
     if(!$rootScope.isVerified){
       //if user not verifed, redirect to login page
       $location.path('/');
     }
     $scope.lookupData = coreService.ParseJSON(coreService.getLocalStorage('lookupData'));
     $scope.Titles = $scope.lookupData.Titles;
     $scope.Genders= $scope.lookupData.Genders;
     $scope.States = $scope.lookupData.States;
     $scope.HomeState = $scope.States[0].StateId;
     $scope.PostalState = $scope.States[0].StateId;
     $scope.ConcessionCards = $scope.lookupData.ConcessionCards;
     $scope.ConcessionCardType = $scope.ConcessionCards[0].ConcessionCardId;
     $scope.stepValid = true;
     $scope.stepValidMsg = {};
     if($.isEmptyObject(coreFactory.applicantData)){
       coreFactory.applicantData = coreService.ParseJSON(coreService.getLocalStorage('applicantData'));
     }
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
       $scope.USIAuthorise = coreFactory.translateBoolean(coreFactory.applicantData.USIAuthorise);
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
     $scope.changedValue = function(item){
       console.log(item);
     };
     $scope.sameAddress = function(){
       console.log(this.HomeState);
       console.log(this.PostalState);
       if(this.isSameAddress){
         this.PostalAddressLine1 = this.HomeAddressLine1;
         this.PostalAddressLine2 = this.HomeAddressLine2;
         this.PostalSuburb = this.HomeSuburb;
         this.PostalState = this.HomeState;
         this.PostalPostCode = this.HomePostCode;
       }
       else{
         this.PostalAddressLine1 = '';
         this.PostalAddressLine2 = '';
         this.PostalSuburb = '';
         this.PostalState = $scope.States[0].StateId;
         this.PostalPostCode = '';
       }
     };
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
       if(coreFactory.translateBoolean(this.HasAgreeTermAtBeginning) === '0'){
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
       if(coreFactory.translateBoolean(this.HasUSI) === '1' && (this.USI === undefined || this.USI === '')){
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
       $('body').scrollTop(0);
       if(this.stepValid){
         //POST
         var step2Data = {"PassKey": settingFactory.passKey, "ApplicantID": this.ApplicantId, "HasAgreeTermAtBeginning": parseInt(coreFactory.translateBoolean(this.HasAgreeTermAtBeginning)), "Title": parseInt(this.Title), "PreferredName": this.PreferredName, "DateofBirth": coreFactory.UTCTime(this.DateOfBirth), "Gender": parseInt(this.Gender), "HomePhone": this.HomePhone, "MobilePhone": this.WorkPhone, "WorkPhone": this.WorkPhone, "HomeAddressLine1": this.HomeAddressLine1, "HomeAddressLine2": this.HomeAddressLine2, "HomeSuburb": this.HomeSuburb, "HomeState": parseInt(this.HomeState), "HomePostCode": this.HomePostCode, "PostalAddressLine1": this.PostalAddressLine1, "PostalAddressLine2": this.PostalAddressLine2, "PostalSuburb": this.PostalSuburb, "PostalState": parseInt(this.PostalState), "PostalPostCode": this.PostalPostCode,"PreferredMailType":parseInt(this.PreferredMailType), "HasUSI": parseInt(this.HasUSI), "USI": this.USI, "USIAuthorise": parseInt(this.USIAuthorise), "HasConcessionCard": parseInt(this.HasConcessionCard), "ConcessionCardType": parseInt(this.ConcessionCardType), "ConcessionCardNumber": this.ConcessionCardNumber, "ConcessionCardName": this.ConcessionCardName, "ConcessionCardExpiryDate": coreFactory.UTCTime(this.ConcessionCardExpiryDate)};
         coreFactory.postData(settingFactory.step2URL, step2Data, 'step2');

       }
     }
});
