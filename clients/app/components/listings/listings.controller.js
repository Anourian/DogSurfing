angular.module('dogSurfing')
  .controller('listingsController', function ($scope, dataFactory){    
    $scope.getData = function(){
      dataFactory.getListings().then(function(data){
        $scope.listings = data;
      });
    };
    $scope.getData();

  });