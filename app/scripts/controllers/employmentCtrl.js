'use strict';

/**
 * @ngdoc function
 * @name tlcApp.controller:PersonalCtrl
 * @description
 * # PersonalCtrl
 * Controller of the tlcApp
 */
angular.module('tlcApp')
   .controller('EmploymentCtrl', function ($rootScope, $scope, $location, settingFactory, coreService, coreFactory) {
     $scope.coreFactory = coreFactory;
     if(!$rootScope.isVerified){
       //if user not verifed, redirect to login page
       //$location.path('/');  TODO: enable when ready
       coreFactory.fetchData(settingFactory.lookupURL); //TODO: delete this when ready
     }
     $scope.ApplicantId = coreFactory.applicantData.ApplicantId;
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
       //validate step 1
       if(coreFactory.translateBoolean(this.HasAgreeTermAtBeginning) === 0){
         this.stepValidMsg['Agree terms:'] = "Please tick [Agree] terms";
         this.stepValid = false;
       }
       if(this.Title === undefined){
         this.stepValidMsg['Title:'] = "Please select your [Title]";
         this.stepValid = false;
       }
       if(!coreFactory.UTCTime(this.DateOfBirth) || !coreFactory.ispastDate(this.DateOfBirth)){
         this.stepValidMsg['DOB:'] = "Please select your [Date of Birth]";
         this.stepValid = false;
       }
       if(this.Gender === undefined){
         this.stepValidMsg['Gender:'] = "Please select your [Gender]";
         this.stepValid = false;
       }
       if(this.MobilePhone === undefined || this.MobilePhone === ''){
         this.stepValidMsg['MobilePhone:'] = "Please provide your [MobilePhone]";
         this.stepValid = false;
       }
       if(this.WorkPhone === undefined || this.WorkPhone === ''){
         this.stepValidMsg['WorkPhone:'] = "Please provide your [WorkPhone]";
         this.stepValid = false;
       }
       if(this.HomeAddressLine1 === undefined || this.HomeAddressLine1 === ''){
         this.stepValidMsg['Home Address Line1:'] = "Please provide your [Home Address Line 1]";
         this.stepValid = false;
       }
       if(this.HomeSuburb === undefined || this.HomeSuburb === ''){
         this.stepValidMsg['Home Suburb:'] = "Please provide your [Home Suburb]";
         this.stepValid = false;
       }
       if(this.HomePostCode === undefined || this.HomePostCode === ''){
         this.stepValidMsg['Home Postcode:'] = "Please provide your [Home Postcode]";
         this.stepValid = false;
       }
       if(this.PostalAddressLine1 === undefined || this.PostalAddressLine1 === ''){
         this.stepValidMsg['Postal Address Line1:'] = "Please provide your [Postal Address Line 1]";
         this.stepValid = false;
       }
       if(this.PostalSuburb === undefined || this.PostalSuburb === ''){
         this.stepValidMsg['Postal Suburb:'] = "Please provide your [Postal Suburb]";
         this.stepValid = false;
       }
       if(this.PostalPostCode === undefined || this.PostalPostCode === ''){
         this.stepValidMsg['Postal Postcode:'] = "Please provide your [Postal Postcode]";
         this.stepValid = false;
       }
       if(this.PreferedMailType === undefined){
         this.stepValidMsg['Prefered Mail Type:'] = "Please provide your [Prefered Mail Type]";
         this.stepValid = false;
       }
       if(this.HasUSI === undefined){
         this.stepValidMsg['Has USI:'] = "Please check if you have [USI]";
         this.stepValid = false;
       }
       if(coreFactory.translateBoolean(this.HasUSI) === 1 && (this.USI === undefined || this.USI === '')){
         this.stepValidMsg['USI:'] = "Please provide you [USI]";
         this.stepValid = false;
       }
       console.log(typeof this.HasConcessionCard);
       if(this.HasConcessionCard === undefined){
         this.stepValidMsg['Has Concession Card:'] = "Please check if you have [Concession Card]";
         this.stepValid = false;
       }
       if(this.HasConcessionCard === '1' && (this.ConcessionCardNumber === undefined || this.ConcessionCardNumber === '')){
         this.stepValidMsg['Concession Card Number:'] = "Please provide you [Concession Card Number]";
         this.stepValid = false;
       }
       if(this.HasConcessionCard === '1' && (this.ConcessionCardName === undefined || this.ConcessionCardName === '')){
         this.stepValidMsg['Name on Card:'] = "Please provide you [Name on Card]";
         this.stepValid = false;
       }
       if(this.HasConcessionCard === '1' && (!coreFactory.UTCTime(this.ConcessionCardExpiryDate) || coreFactory.ispastDate(this.ConcessionCardExpiryDate))){
         this.stepValidMsg['Concession Card Expiry Date:'] = "Please check your [Concession Card Expiry Date]";
         this.stepValid = false;
       }
       if(this.stepValid){
         //POST
         var step2Data = {"PassKey": settingFactory.passKey, "ApplicantID": this.GivenName, "HasAgreeTermAtBeginning": this.HasAgreeTermAtBeginning, "Title": this.Title, "PreferedName": this.PreferedName, "DateofBirth": coreFactory.UTCTime(this.DateOfBirth), "Gender": this.Gender, "HomePhone": this.HomePhone, "MobilePhone": this.WorkPhone, "WorkPhone": this.WorkPhone, "HomeAddressLine1": this.HomeAddressLine1, "HomeAddressLine2": this.HomeAddressLine2, "HomeSuburb": this.HomeSuburb, "HomeState": this.HomeState, "HomePostCode": this.HomePostCode, "PostalAddressLine1": this.PostalAddressLine1, "PostalAddressLine2": this.PostalAddressLine2, "PostalSuburb": this.PostalSuburb, "PostalState": this.PostalState, "PostalPostCode": this.PostalPostCode,"PreferedMailType":this.PreferedMailType, "HasUSI": this.HasUSI, "USI": this.USI, "USIAuthorise": this.USIAuthorise, "HasConcessionCard": this.HasConcessionCard, "ConcessionCardType": this.ConcessionCardType, "ConcessionCardNumber": this.ConcessionCardNumber, "ConcessionCardName": this.ConcessionCardName, "ConcessionCardExpiryDate": coreFactory.UTCTime(this.ConcessionCardExpiryDate)};
         coreFactory.postData(settingFactory.step2URL, step2Data, 'step2');

       }
     }
});
