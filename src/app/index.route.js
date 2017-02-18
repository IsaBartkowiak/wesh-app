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
      .state('addevent', {
        url: '/ajouter-evenement/',
        templateUrl: 'app/events/add-event.html',
        controller: 'EventController',
        controllerAs: 'EventCtrl'
      });

    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);

  }

})();
