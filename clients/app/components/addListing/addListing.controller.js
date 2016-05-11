angular.module('dogSurfing')
.controller('addListingController', function ($scope, dataFactory, $state){
  $scope.createPost = function(name, email, message, url, type, dogtype) {
    dataFactory.createPost({name: name, email: email, message: message, image:url,type:type,dogtype:dogtype})
    .then(function(res) {
      $scope.message = '';
      if (res = 'Post successful'){
        $state.go('home.listings');
      }
    });
  };

});

