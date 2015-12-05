'use strict';

/**
 * @ngdoc function
 * @name tlcApp.controller:InformationCtrl
 * @description
 * # InformationCtrl
 * Controller of the tlcApp
 */
angular.module('tlcApp')
   .controller('InformationCtrl', function ($rootScope, $scope, $location, settingFactory, coreService, coreFactory) {
     $scope.coreFactory = coreFactory;
     if(!$rootScope.isVerified){
       //if user not verifed, redirect to login page
       $location.path('/');
     }

     $scope.lookupData = coreService.ParseJSON(coreService.getLocalStorage('lookupData'));
     $scope.Countries = $scope.lookupData.Countries;
     $scope.Origins= $scope.lookupData.Origins;
     $scope.LanguageProficiencies = $scope.lookupData.LanguageProficiencies;
     $scope.CountryofBirth = $scope.Countries[12].CountryId;
     $scope.VisaTypes= $scope.lookupData.VisaTypes;
     $scope.DisabilityAreas= $scope.lookupData.DisabilityAreas;
     $scope.DisabilityParts = {ids: {}, arr: []};
     $scope.HeardAbouts= $scope.lookupData.HeardAbouts;
     $scope.stepValid = true;
     $scope.stepValidMsg = {};
     if($.isEmptyObject(coreFactory.applicantData)){
       coreFactory.applicantData = coreService.ParseJSON(coreService.getLocalStorage('applicantData'));
     }
     //console.log(coreFactory.applicantData);
     if(coreFactory.applicantData.ApplicantId){
       $scope.ApplicantId = coreFactory.applicantData.ApplicantId;
       $scope.CountryofBirth = coreFactory.applicantData.CountryofBirth;
       $scope.CityofBirth = coreFactory.applicantData.CityofBirth;
       $scope.Aboriginal = coreFactory.translateBoolean(coreFactory.applicantData.Aboriginal);
       $scope.Origin = coreFactory.applicantData.Origin;
       $scope.SpeakOtherLanguage = coreFactory.translateBoolean(coreFactory.applicantData.SpeakOtherLanguage);
       $scope.LanguageOtherEnglish = coreFactory.applicantData.LanguageOtherEnglish;
       $scope.EnglishProficiency = coreFactory.applicantData.EnglishProficiency;
       $scope.HoldVisa = coreFactory.translateBoolean(coreFactory.applicantData.HoldVisa);
       $scope.VisaType = coreFactory.applicantData.VisaType;
       $scope.OtherVisaType = coreFactory.applicantData.OtherVisaType;
       $scope.UploadVisa = coreFactory.translateBoolean(coreFactory.applicantData.UploadVisa);
       $scope.Disability = coreFactory.translateBoolean(coreFactory.applicantData.Disability);
       if(coreFactory.applicantData.DisabilityParts !== undefined){
         $scope.DisabilityParts.arr = coreFactory.applicantData.DisabilityParts;
         console.log($scope.DisabilityParts.arr);
         for(var n = 0; n < $scope.DisabilityParts.arr.length; n++){
           var key = $scope.DisabilityParts.arr[n];
           console.log(key);
           $scope.DisabilityParts.ids[key] = true;
         }
       }

       $scope.ApplyDAAWSFunding = coreFactory.translateBoolean(coreFactory.applicantData.ApplyDAAWSFunding);
       $scope.EmergencyContactName = coreFactory.applicantData.EmergencyContactName;
       $scope.EmergencyContactRelationship = coreFactory.applicantData.EmergencyContactRelationship;
       $scope.EmergencyContactMobile = coreFactory.applicantData.EmergencyContactMobile;
       $scope.EmergencySecondContactNo = coreFactory.applicantData.EmergencySecondContactNo;
       $scope.AdditionalEmergencyContactName = coreFactory.applicantData.EmergencyAdditionalContact;
       $scope.AdditionalEmergencyContactRelationship = coreFactory.applicantData.AdditionalEmergencyContactRelationship;
       $scope.AdditionalEmergencyContactMobile = coreFactory.applicantData.AdditionalEmergencyContactMobile;
       $scope.AdditionalEmergencySecondContactNo = coreFactory.applicantData.AddEmergSecondContactNo;
       $scope.DoctorName = coreFactory.applicantData.DoctorName;
       $scope.DoctorPhone = coreFactory.applicantData.DoctorPhone;
       $scope.PreferredHospital = coreFactory.applicantData.PreferredHospital;
       $scope.HeardAboutUs = coreFactory.applicantData.HeardAboutUs;
       $scope.OtherHeardAboutUs = coreFactory.applicantData.OtherHeardAboutUs;
     }
     $scope.prev = function(){
       $location.path('/employment');
     }
     $scope.next = function(){
       this.stepValidMsg = {};
       //init
       this.stepValid = true;
       this.CityofBirthErr = false;
       this.AboriginalErr = false;
       this.OriginErr = false;
       this.SpeakOtherLanguageErr = false
       this.LanguageOtherEnglishErr = false;
       this.EnglishProficiencyErr = false;
       this.HoldVisaErr = false;
       this.VisaTypeErr = false;
       this.UploadVisaErr = false;
       this.OtherVisaTypeErr = false;
       this.DisabilityErr = false;
       this.DisabilityPartsErr = false;
       this.ApplyDAAWSFundingErr = false;
       this.HeardAboutUsErr = false;
       this.OtherHeardAboutUsErr = false;

       //validate step 4
       if(this.CityofBirth === undefined || this.CityofBirth === ''){
         this.CityofBirthErr = true;
         this.stepValid = false;
       }
       if(this.Aboriginal === undefined){
         this.AboriginalErr = true;
         this.stepValid = false;
       }
       if(this.Aboriginal === '1' && (this.Origin === undefined)){
         this.OriginErr = true;
         this.stepValid = false;
       }
       if(this.SpeakOtherLanguage === undefined){
         this.SpeakOtherLanguageErr = true;
         this.stepValid = false;
       }
       if(this.SpeakOtherLanguage === '1' && (this.LanguageOtherEnglish === undefined || this.LanguageOtherEnglish === '')){
         this.LanguageOtherEnglishErr = true;
         this.stepValid = false;
       }
       if(this.EnglishProficiency === undefined){
         this.EnglishProficiencyErr = true;
         this.stepValid = false;
       }
       if(this.HoldVisa === undefined){
         this.HoldVisaErr = true;
         this.stepValid = false;
       }
       if(this.HoldVisa === '1' && this.VisaType === undefined){
         this.VisaTypeErr = true;
         this.stepValid = false;
       }
       if(this.HoldVisa === '1' && this.VisaType === '4' && (this.OtherVisaType=== undefined || this.OtherVisaType === '')){
         this.OtherVisaTypeErr = true;
         this.stepValid = false;
       }
       if(this.HoldVisa === '1' && coreFactory.translateBoolean(this.UploadVisa) === '0'){
         this.UploadVisaErr = true;
         this.stepValid = false;
       }
       if(this.Disability === undefined){
         this.DisabilityErr = true;
         this.stepValid = false;
       }
       this.DisabilityParts.arr = [];
       for(var key in this.DisabilityParts.ids) {
           var value = this.DisabilityParts.ids[key];
           if(value){
             this.DisabilityParts.arr.push(key);
           }
       }
       if(this.Disability === '1' && this.DisabilityParts.arr.length <= 0){
         this.DisabilityPartsErr = true;
         this.stepValid = false;
       }

      if(this.ApplyDAAWSFunding === undefined){
        this.ApplyDAAWSFundingErr = true;
        this.stepValid = false;
      }
      if(this.HeardAboutUs === undefined){
        this.HeardAboutUsErr = true;
        this.stepValid = false;
      }
      this.stepValid = true;
       if(this.stepValid){
         //POST
         var step4Data = {'PassKey': settingFactory.passKey, 'ApplicantId': this.ApplicantId, 'CountryofBirth': parseInt(this.CountryofBirth), 'CityofBirth': this.CityofBirth, 'Aboriginal': parseInt(this.Aboriginal), 'Origin': parseInt(this.Origin), 'SpeakOtherLanguage': parseInt(this.SpeakOtherLanguage), 'LanguageOtherEnglish': this.LanguageOtherEnglish, 'EnglishProficiency': parseInt(this.EnglishProficiency), 'HoldVisa': parseInt(this.HoldVisa), 'VisaType': parseInt(this.VisaType), 'OtherVisaType': this.OtherVisaType, 'UploadVisa': parseInt(coreFactory.translateBoolean(this.UploadVisa)), 'Disability': parseInt(this.Disability), 'DisabilityParts': this.DisabilityParts.arr, 'ApplyDAAWSFunding': parseInt(this.ApplyDAAWSFunding), 'EmergencyContactName': this.EmergencyContactName, 'EmergencyContactRelationship': this.EmergencyContactRelationship, 'EmergencyContactMobile': this.EmergencyContactMobile, 'EmergencySecondContactNo': this.EmergencySecondContactNo, 'EmergencyAdditionalContact': this.AdditionalEmergencyContactName, 'AdditionalEmergencyContactRelationship': this.AdditionalEmergencyContactRelationship, 'AdditionalEmergencyContactMobile': this.AdditionalEmergencyContactMobile, 'AddEmergSecondContactNo': this.AdditionalEmergencySecondContactNo,'DoctorName': this.DoctorName,'DoctorPhone':this.DoctorPhone, 'PreferredHospital': this.PreferredHospital, 'HeardAboutUs': parseInt(this.HeardAboutUs), 'OtherHeardAboutUs': this.OtherHeardAboutUs};
         //console.log(step4Data);
         coreFactory.postData(settingFactory.step4URL, step4Data, 'step4');
       }
     }
});
