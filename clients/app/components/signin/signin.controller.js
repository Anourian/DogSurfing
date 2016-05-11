angular.module('dogSurfing')
.controller('signInController', function($scope, dataFactory, $window, $state){
  $scope.loginError;  
  $scope.signIn = function (name, pass){
    var temp = {name:name, password:pass};
    dataFactory.signIn(temp).then(function(data){     
      if (data !== 'error'){
        dataFactory.logIn(name,data);        
        $scope.loginError = '';
        $state.go('home.listings');
      } else {
        $scope.loginError = 'Username or password is invalid';
      }
      
    });
  };
});