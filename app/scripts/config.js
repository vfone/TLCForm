'use strict';

var config = angular.module('tlcApp');

config.factory('settingFactory', function() {
  var setting = {};


  setting.passKey = 'tlc1234';
  //LOOKUP ENDPOINT
  setting.lookupURL = 'http://tlcapi.cocodemo.com/tlc/api/lookup/'+ setting.passKey;
  //POSTING ENDPOINTS
  setting.createURL = 'http://tlcapi.cocodemo.com/tlc/api/step1';
  setting.loginURL = 'http://tlcapi.cocodemo.com/tlc/api/step1a';
  setting.recoveryURL = 'http://tlcapi.cocodemo.com/tlc/api/step1b';
  setting.resetURL = 'http://tlcapi.cocodemo.com/tlc/api/step1c';
  setting.step2URL = 'http://tlcapi.cocodemo.com/tlc/api/step2';
  setting.step3URL = 'http://tlcapi.cocodemo.com/tlc/api/step3';
  setting.step4URL = 'http://tlcapi.cocodemo.com/tlc/api/step4';
  setting.step5URL = 'http://tlcapi.cocodemo.com/tlc/api/step5';
  setting.uploadFile = 'http://tlcapi.cocodemo.com/tlc/api/upnext.aspx?id=';

  setting.redirectURL = '/upNext.aspx';

  return setting;
});
config.factory('shareData', function(){
  return{
    isuniqueEmail: false,

    validatedList: [],

    ApplicantTypes: [],
    Titles: [],
    States: [],
    Countries: [],
    PreferredEmails: [],
    Qualifications: [],
    Procedures: [],
    OtherProcedures: [],
    //variables for page 1
    userApplicantTypeCode: '',
    userTitleId: '',
    userTitleName: 'Title',
    userFirstName: '',
    userMiddleName: '',
    userFamilyName: '',

    userOrganisation: '',
    userAddressLine1: '',
    userAddressLine2: '',
    userPostCode: '',
    userSuburb: '',
    userCountryName: 'Australia',
    userCountryId: '13',
    userStateName: 'State',
    userStateId: '',
    userOtherState: '',

    userBusinessPhone: '',
    userHomePhone: '',
    userBusinessMobile: '',
    userPrivateMobile: '',
    userBusinessFax: '',
    userHomeFax: '',

    userPreferredEmailCode: '',
    userBusinessEmail: '',
    userreenterBusinessEmail: '',
    userHomeEmail: '',
    userreenterHomeEmail: '',
    userWebsiteAddress: '',

    userPracticeBusinessName: '',
    userOtherHospitalName: '',
    PracticesamePostalAddressCheck: '',
    userPracticeAddressLine1: '',
    userPracticeAddressLine2: '',
    userPracticePostCode: '',
    userPracticeSuburb: '',
    userPracticeCountryName: 'Australia',
    userPracticeCountryId: '13',
    userPracticeStateName: 'State',
    userPracticeStateId: '',
    userPracticeOtherState: '',

    ResidentialsamePostalAddressCheck: '',
    userResidentialAddressLine1: '',
    userResidentialAddressLine2: '',
    userResidentialSuburb: '',
    userResidentialPostCode: '',
    userResidentialCountryName: 'Australia',
    userResidentialCountryId: '13',
    userResidentialStateName: 'State',
    userResidentialStateId: '',
    userResidentialOtherState: '',
    //variables for page 2
    Universities:[],
    OtherUniversities: [],

    AU_MedRego: '',
    NZ_MedRego: '',
    CH_MedRego: '',
    ID_MedRego: '',
    SI_MedRego: '',
    OtherMedRego: '',
    Restriction: '',
    Litigation: '',
    //variables for page 3
    Memberships:[],
    SocietyName1: '',
    NameAndTitle1: '',
    Position1: '',
    Phone1: '',
    Email1: '',
    NameAndTitle2: '',
    Position2: '',
    Phone2: '',
    Email2: '',
    NameAndTitle3: '',
    Position3: '',
    Phone3: '',
    Email3: '',
    //variables for page 4
    CosmeticProcedures: {
        procedureScore0: 0, procedureScore1: 0, procedureScore2: 0, procedureScore3: 0, procedureScore4: 0,
        procedureScore5: 0, procedureScore6: 0, procedureScore7: 0, procedureScore8: 0, procedureScore9: 0,
        procedureScore10: 0, procedureScore11: 0, procedureScore12: 0, procedureScore13: 0, procedureScore14: 0,
        procedureScore15: 0, procedureScore16: 0, procedureScore17: 0, procedureScore18: 0, procedureScore19: 0,
        procedureScore20: 0, procedureScore21: 0, procedureScore22: 0, procedureScore23: 0, procedureScore24: 0,
        procedureScore25: 0, procedureScore26: 0, procedureScore27: 0, procedureScore28: 0, procedureScore29: 0,
        procedureScore30: 0, procedureScore31: 0, procedureScore32: 0, procedureScore33: 0, procedureScore34: 0,
        procedureScore35: 0, procedureScore36: 0, procedureScore37: 0, procedureScore38: 0, procedureScore39: 0,
        procedureScore40: 0, procedureScore41: 0
    },
    PostCosmeticProcedures: [],
    OtherCosmeticProcedures: [],
    OtherServices: [],

    //variables for page 5 & 6
    PrivacyCheck: '',
    InsuranceName: '',
    CoverLevel: '',
    AdditionalInfo: '',
    MDO_MembershipNumber: '',
    AllowToVerify: '',
    declarationCheck: ''
};
});
