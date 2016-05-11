angular.module('dogSurfing')
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/')
    $stateProvider
      .state('home', {
        url:'/',
        templateUrl: 'app/components/template.html',
        controller: 'templateController',
        controllerAs:'main',
        abstract:true 
      })
      .state('home.main', {
        parent:'home',
        url:'',
        templateUrl: 'app/components/main/main.html' 
      })
      .state('home.listings', {
        parent:'home',
        url:'listings',
        templateUrl: 'app/components/listings/listings.html',
        controller: 'listingsController'
      })
      /*.state('home.directory', {
        parent:'home',
        url:'directory',
        templateUrl: 'app/components/directory/directory.html',
        controller: 'directoryController',
        resolve: {
          getAllProfiles:function(dataFactory){
            return dataFactory.getAllProfiles();
          }
        }
      })*/
      .state('home.profile', {
        parent:'home',
        url:'profile/:email',
        templateUrl: 'app/components/profile/profile.html',
        controller: 'profileController',
        resolve: {
          getProfile:function(dataFactory, $stateParams){
          return dataFactory.getProfile($stateParams.email);
          }
        }
      })      
      .state('home.create', {
        parent:'home',
        url:'create',
        templateUrl: 'app/components/create/create.html',
        controller: 'createController'
      })
      .state('home.signin', {
        parent:'home',
        url:'signin',
        templateUrl: 'app/components/signin/signin.html',
        controller: 'signInController'
      })
      .state('home.addListing', {
        parent:'home',
        url: 'addListing',
        templateUrl: 'app/components/addListing/addListing.html',
        controller: 'addListingController'
      })
  }])