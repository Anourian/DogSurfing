angular.module('dogSurfing')
  .controller('templateController', function ($scope,dataFactory, $window){
    dataFactory.getAuth();
    this.auth = dataFactory.auth;
    this.logOut = function (){        
        dataFactory.logOut();        
    };    
  });