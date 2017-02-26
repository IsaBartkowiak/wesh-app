(function() {
  'use strict';

  angular
    .module('events')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($rootScope, $timeout, toastr, event, moment, users) {
    var vm = this;
    $rootScope.bodyClass = "app";
    $rootScope.context = "main";

    vm.events = {};
    vm.data = moment;
    vm.isActive = isActive;

    function isActive(viewLocation) { 
        return viewLocation === $location.path() ? 'active' : '';
    }

    activate();

    function activate() {
      event.getAll(function(data){
        vm.events = data;
      });
    }

   
  }
})();
