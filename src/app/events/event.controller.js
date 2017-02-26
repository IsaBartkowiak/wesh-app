(function() {
  'use strict';

  angular
  .module('events')
  .controller('EventController', EventController);

  /** @ngInject */
  function EventController($rootScope, toastr, event) {
    var vm = this;
    $rootScope.context = "add";

    vm.event = {};
    vm.dates = 1;
    vm.getNumber = getNumber;
    vm.addField = addField;
    vm.isActive = isActive;

    function isActive(viewLocation) { 
        return viewLocation === $location.path() ? 'active' : '';
    }
    
    function addField() {
      vm.dates++;
    }
    
    function getNumber(num) {
      return new Array(num);   
    }

    
  }
})();
