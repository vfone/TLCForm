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
  this.sendingWindow = function(isSending){
    if(isSending){
      if(parseInt(window.innerHeight)>parseInt($('html').height())){
        $('#sendingWindow').height(window.innerHeight).find('img').css('margin-top','20%');
      }
      else{
        $('#sendingWindow').height($('html').height()).find('img').css('margin-top','80%');
      }
      $('#sendingWindow').show();
    }
    else{
      $('#sendingWindow').hide();
    }
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

core.factory('coreFactory', function($rootScope, $location, $http, $route, coreService, settingFactory) {
  var coreFn = {};
  coreFn.lookupData = {}; //lookup data for form fields
  coreFn.applicantData = {}; //return applicant's data
  $rootScope.isVerified = false; //if userid and password verified
  $rootScope.isOK = true; //return res from post
  $rootScope.isSent = false; //if recovery password sent
  $rootScope.showLostPwdBtn = true;
  $rootScope.resetSent = false;
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
  };
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
    var translated = '0';
    if(res===true){
      translated = '1';
    }
    return translated;
  }
  coreFn.translateDigit = function(res){
    var translated = true;
    if(res === 0){
      translated = false;
    }
    return translated;
  }
  coreFn.UTCTime = function(date){
    var dateArr = date.split('/');
    if(isNaN(parseInt(dateArr[0]))|| isNaN(parseInt(dateArr[1])) || isNaN(parseInt(dateArr[2]))){
      return false;
    }
    return (dateArr[2]+'-'+dateArr[1]+'-'+dateArr[0]+'T00:00:00');
  }
  //get Lookup data
  coreFn.fetchData = function(apiURL){

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
  coreFn.postData = function(postURL, data, ev){
    var res = true;
    // console.log('POSTING URL:');
    // console.log(postURL);
    // console.log('POSTING DATA:');
    // console.log(data);
    coreService.sendingWindow(true);
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
        coreService.sendingWindow(false);
        //console.log(res);
        if(res === 'NOTOK'){
          $rootScope.isOK = false;
        }
        else{
          $rootScope.isOK = true;
          coreFn.applicantData = res;
          coreService.setLocalStorage('applicantData',coreService.StringifyJSON(res));
          if(ev == 'login' || ev == 'create' || ev == 'reset'){
            coreFn.applicantData = res;
            $rootScope.isVerified = true;
            $location.path('/personal');
          }
          else if(ev == 'recovery'){
            $rootScope.isSent = true;
            $rootScope.showLostPwdBtn = false;
            $rootScope.resetSent = true;
            $rootScope.$broadcast('recoverySent');
          }
        }
        if(ev == 'step2'){
          $location.path('/employment');
        }
        if(ev == 'step3'){
          $location.path('/information');
        }
        if(ev == 'step4'){
          $location.path('/course');
        }
        if(ev == 'step5'){
          coreService.removeLocalStorage('applicantData');
          window.location = settingFactory.uploadFile + coreFn.applicantData.ApplicantId;
        }
        return res;
    }).
    error(function(data, status, headers, config) {
        coreService.sendingWindow(false);
        data = data!==null?data:{'Message':'Connection failed!'};
        if(ev == 'login' || ev == 'create' || ev == 'reset'){
          $rootScope.isVerified = false;
        }
        else if(ev == 'recovery'){
          $rootScope.isSent = false;
        }
        coreService.modalWindow('show', 'modalErrorWindow', 'Oooops, something went wrong', data.Message + ' Please try it again.', 'click', 'Button Text', false);
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
