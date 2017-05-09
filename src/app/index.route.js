(function() {
  'use strict';

  angular
    .module('events')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('login', {
        url: '/se-connecter/',
        templateUrl: 'app/login/login.html',
        controller: 'LoginController',
        controllerAs: 'login'
      })
      .state('register', {
        url: '/creer-un-compte/',
        templateUrl: 'app/login/register.html',
        controller: 'RegisterController',
        controllerAs: 'register'
      })
      .state('addevent', {
        url: '/ajouter-evenement/',
        templateUrl: 'app/events/add-event.html',
        controller: 'EventController',
        controllerAs: 'EventCtrl'
      })
      .state('singleevent', {
        url: '/evenement/:id',
        templateUrl: 'app/events/single-event.html',
        controller: 'SingleEventController',
        controllerAs: 'single'
      })
	  .state('profile',{
			url:'/profile/',
			templateUrl: 'app/profile/profile.html',
			controller:'ProfileCtrl',
			controllerAS:'Profile'
	  });

    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);

  }

})();
