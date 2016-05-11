angular.module('dogSurfing')
.controller('createController', ['$scope', 'Upload', '$timeout', '$window', '$location','dataFactory',
  function ($scope, Upload, $timeout, $window, $location, dataFactory) {   
    $scope.gPlaceDetails;
    $scope.inUse = '';
    $scope.uploadPic = function(file, name, password, email, location, about) {
    var temp = $scope.gPlaceDetails;
    var loc = {
      location:location,
      lat:temp.geometry.location.lat(),
      lng:temp.geometry.location.lng()
    };
    file.upload = Upload.upload({
      url: '/profile',
      data: {
        name: name,
        password: password,
        email: email,
        location: loc,
        about: about, 
        file: file
      }
    });

    file.upload.then(function (response) {
      if (response.data.token) {
        response.data.data.token = response.data.token;
        dataFactory.logIn($scope.name, response.data.data);
        $location.path('/addListing');
      } else {
        $scope.inUse = response.data.data;
      }
      $timeout(function () {
        file.result = response.data;
      });
    }, function (response) {
      if (response.status > 0)
        $scope.errorMsg = response.status + ': ' + response.data;
      }, function (evt) {
        // Math.min is to fix IE which reports 200% sometimes
        file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
      });
    };
}]);