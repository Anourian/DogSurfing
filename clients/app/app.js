//Declare module
angular.module('dogSurfing', ['ui.router', 'ui.bootstrap', '500tech.simple-calendar', 'ngFileUpload','ngAnimate'])
  .run(function($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.$on('$stateChangeSuccess', function(ev, to, toParams, from) {
            $rootScope.previousState = from.name;
            $rootScope.currentState = to.name;
        });
    });
