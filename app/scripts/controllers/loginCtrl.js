'use strict';

/**
 * @ngdoc function
 * @name tlcApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tlcApp
 */
angular.module('tlcApp')
   .controller('LoginCtrl', function ($rootScope, $scope, $route, $location, settingFactory, coreService, coreFactory) {
     $scope.coreFactory = coreFactory;
     //check if current URL is an reset URL
     $scope.isRestURL = false;
     $scope.token = coreFactory.parseURLPara('token');
     if($scope.token){
       $scope.isRestURL = true;
     }
     //get lookupData
     coreFactory.fetchData(settingFactory.lookupURL);

     $scope.fnSignin = function(){
       var signinData = {"PassKey": settingFactory.passKey, "UserId": this.UserId, "Password": this.UserId};
       //post to step1a for signin
       coreFactory.postData(settingFactory.loginURL, signinData, 'login');
       if(coreFactory.isVerified){
         //relocation to personal view
         $location.path('/personal');
       }
     };
     $scope.fnSignup = function(){
       var signupData = {"PassKey": settingFactory.passKey, "GivenName": this.GivenName, "FamilyName": this.FamilyName, "UserId": this.UserId, "Password": this.Password};
       //post to step1 for signup
       coreFactory.postData(settingFactory.createURL, signupData, 'create');
       if(coreFactory.isVerified){
         //relocation to personal view
         $location.path('/personal');
       }
     };
     $scope.fnRecovery = function(){
       this.isLostPwd = false;
       var recoveryData = {"PassKey": settingFactory.passKey, "UserId": this.UserId};
       //post to step1 for signup
       coreFactory.postData(settingFactory.recoveryURL, recoveryData, 'recovery');
       if(coreFactory.isSent){
         this.showLostPwdBtn = false;
         this.resetSent = true;
       }
     };
     $scope.fnReset = function(){
       var resetData = {"PassKey": settingFactory.passKey, "Token": this.token, "Password": this.ResetPassword};
       //post to step1 for signup
       coreFactory.postData(settingFactory.resetURL, resetData, 'reset');
       if(coreFactory.isVerified){
         //relocation to personal view
         $location.path('/personal');
       }
     };
     $scope.checkEmail = function(){
       this.isEmailValid = coreFactory.validateEmail(this.UserId);
     }
     $scope.checkPassword = function(){
       this.isPasswordValid = coreFactory.validatePassword(this.Password);
       console.log(this.Password + ' is ' + this.isPasswordValid);
     }
     $scope.checkResetPassword = function(){
       this.isResetPasswordValid = coreFactory.validatePassword(this.ResetPassword);
       console.log(this.ResetPassword + ' is ' + this.isResetPasswordValid);
     }

     $scope.comparePassword = function(){
       console.log(this.ResetPassword );
       console.log(this.ResetPasswordAgain);
       if(this.ResetPassword === this.ResetPasswordAgain){
         this.isResetPasswordValid = true;
       }
       else{
         this.isResetPasswordValid = false;
       }
     }
});
