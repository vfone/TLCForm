'use strict';

var core = angular.module('tlcApp');


core.service('coreService', function($rootScope, $http, settingFactory) {
  var self = this;
  this.setLocalStorage = function(k,v){
    localStorage.setItem(k, v);
  };
  this.getLocalStorage = function(k){
    return localStorage.getItem(k);
  };
  this.removeLocalStorage = function(k){
    localStorage.removeItem(k);
  };
  this.clearLocalStorage = function(){
    localStorage.clear();
  };
  this.ParseJSON = function(str){
    return JSON.parse(str);
  };
  this.StringifyJSON = function (obj){
    return JSON.stringify(obj);
  };



  this.print = function(){
    window.print();
  };



  this.modalWindow = function(action, modalCls, modalTitle, modalbody, modalClick, modalButton, modalButtonShow){
    $rootScope.coreService = this;

    $rootScope.modalCls = modalCls;
    $rootScope.modalTitle = modalTitle;
    $rootScope.modalbody = modalbody;
    $rootScope.modalButton = modalButton;

    $('#modalWindow').modal(action);
    $('.modal').on('shown.bs.modal', function(e) {
      //event when modal shown
    })
    .on('hidden.bs.modal', function (e) {
        //event when modal hidden
    });
  };
});

core.factory('coreFactory', function($rootScope, $location, $http, $route, shareData, coreService, settingFactory) {
  var coreFn = {};
  coreFn.lookupData = {}; //lookup data for form fields
  coreFn.applicantData = {}; //return applicant's data
  coreFn.isVerified = false; //if userid and password verified
  coreFn.isSent = false; //if recovery password sent
  coreFn.validateEmail = function(email){
    var re = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return(re.test(email));
  };
  coreFn.validatePassword = function(password){
    var re = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10})/;
    return(re.test(password));
  };
  coreFn.parseURLPara = function(key){
    return  window.location.href.split(key+'=')[1];
  }
  coreFn.ispastDate = function(date){
    try{
      if(coreFn.parseDate(date)){
        if(Date.parse(coreFn.parseDate(date)) < Date.now()){
          return true; //Is a date in history
        }
        else{
          return false; //Is a date in future
        }
      }
      else{
        return true; //invalid date format, set blocker
      }
    }
    catch(e){
      return true; //invalid date format, set blocker
    }

  };
  coreFn.isFutureYear = function(year){
    var currentYear = new Date().getFullYear();
    //console.log(parseInt(year)>currentYear);
    if(parseInt(year)>currentYear){
      return true;
    }
    else{
      return false;
    }
  };
  coreFn.parseDate = function(date){
    var t = date.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    //console.log(t);
    if(t!==null){
      var d=+t[1], m=+t[2], y=+t[3];
      var date = new Date(y,m-1,d);
      if(date.getFullYear()===y && date.getMonth()===m-1){
        //console.log(date);
        return date;
      }
    }
    return false;
  };
  coreFn.translateBoolean = function(res){
    var translated = 0;
    if(res){
      translated = 1;
    }
    return translated;
  }
  coreFn.UTCTime = function(date){
    var dateArr = date.split('/');
    return (dateArr[2]+'-'+dateArr[1]+'-'+dateArr[0]+'T00:00:00');
  }
  //get Lookup data
  coreFn.fetchData = function(apiURL){
    console.log(apiURL);
    $http({method: 'GET', url: apiURL,
      format:'json'
    }).
    success(function(data) {
        coreService.setLocalStorage('lookupData',coreService.StringifyJSON(data));
    }).
    error(function(data, status, headers, config) {
      console.log("data loading failed");

      coreService.modalWindow('show', 'modalErrorWindow', 'Sorry, connection seems down!', 'The connect is current unavaiable, please try it again.', 'click', 'Button Text', false);
    }).then(function() {

    });
  };
  coreFn.postData = function(postURL, data, action){
    var res = true;

    console.log(data);
    var promise = $http({
      method: 'POST',
      url: postURL,
      data: data,
      dataType: 'json',
      headers: {
        'Content-Type': 'application/json'
      }
    }).
    success(function(response, status, action) {
        res = response;
        //action options are:
        //login: verify UserId and Password expect return OK with Applicant Data or NOT OK;
        //create: create account expect return OK with Applicant Data or NOT OK;
        //recovery: request reset password, expect an email to be sent
        //reset: update user password expect return OK with Applicant Data or NOT OK;
        //postform: submit form data expect return OK or NOT OK;
        console.log(res);
        if(action == 'login' || action == 'create' || action == 'reset'){
          coreFn.applicantData = res;
          coreFn.isVerified = true;
        }
        else if(action == 'recovery'){
          coreFn.isSent = true;
        }
        return res;
    }).
    error(function(data, status, headers, config) {
        if(action == 'login' || action == 'create' || action == 'reset'){
          coreFn.isVerified = false;
        }
        else if(action == 'recovery'){
          coreFn.isSent = false;
        }
        coreService.modalWindow('show', 'modalErrorWindow', 'Oooops, something went wrong', data.Message + ' Please try it again.', 'click', 'Button Text', false);

      //self.modalWindow('show', 'modalErrorWindow');
    }).
    then(function(d){
      return d;
    });
    return promise.then();
  };

  coreFn.uniqueEmail = function(email){
        coreFn.postData(settingFactory.emailVarifyURL, JSON.stringify({ "Email": email, "PassKey": settingFactory.passKey }));
  };
  return coreFn;
});
