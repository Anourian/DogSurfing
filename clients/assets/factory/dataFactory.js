angular.module('dogSurfing')
.factory('dataFactory', function($http, $window) {
  var currentProfile;
  var allProfiles = {};
  var auth = {
    loggedIn:false,
    username:'',
    token:'',
    image:'',
    email:''
  };
  var createPost = function(dataObj) {
    return $http.post('/post', dataObj)
    .then(function(result) {
      return result.data;
    });
  };
  var getListings = function(){
    return $http.get('/post')
    .then(function(result){
      return result.data;
    });
  };
  var updateProfile = function (email, dataObj) {
    return $http.put('/profile/' + email, dataObj)
      .then(function (result) {
        return result.data;
      });
  };
  var getProfile = function (email){
    return $http.get('/profile/'+ email)
    .then(function(result){
      currentProfile = result.data;
    });
  };
  var getAllProfiles = function (){
    return $http.get('/profiles')
    .then(function(result){
      allProfiles.data = result.data;
    });
  };
  var getCurrent = function(){
    return currentProfile;
  };
  var updateCalendar = function(email, obj) {
    return $http.put('/profile/' + email, obj)
    .then(function(res) {
      return res.data;
    });
  };
  var getAuth = function (){
    if ($window.sessionStorage.dogSurfingName && $window.sessionStorage.dogSurfingToken){
      auth.username = $window.sessionStorage.dogSurfingName;
      auth.token = $window.sessionStorage.dogSurfingToken;
      auth.image = $window.sessionStorage.dogSurfingUserImage;
      auth.email = $window.sessionStorage.dogSurfingUserEmail;
      auth.loggedIn = true;
      return true;
    }
    return false;
  };
  var signIn = function(obj){
    return $http.post('/login', obj)
    .then(function(result){
      return result.data;
    });
  };
  var logIn = function(name, data){
    $window.sessionStorage.setItem('dogSurfingToken', data.token);
    $window.sessionStorage.setItem('dogSurfingName', name);
    $window.sessionStorage.setItem('dogSurfingUserEmail', data.email);
    $window.sessionStorage.setItem('dogSurfingUserImage', data.image);
    auth.username = name;
    auth.token = data.token;
    auth.image = data.image;
    auth.email = data.email;
    auth.loggedIn = true;
  };  
  var logOut = function (){
    $window.sessionStorage.clear();
    auth.loggedIn =false;
    auth.username='';
    auth.token='';
    auth.image='';
    auth.email='';
  };
  /*var clearStorage = function(){
    $window.sessionStorage.clear();
  };*/
  return {
    createPost: createPost,
    getListings:getListings,
    updateProfile: updateProfile,
    getProfile:getProfile,
    currentProfile:getCurrent,
    getAllProfiles:getAllProfiles,
    getProfiles: allProfiles,
    updateCalendar: updateCalendar,
    getAuth:getAuth,
    signIn:signIn,
    auth:auth,
    logIn:logIn,
    logOut:logOut
  };
});