angular.module('dogSurfing')
.controller('directoryController', function($scope,dataFactory){  
  $scope.profiles = dataFactory.getProfiles;
});