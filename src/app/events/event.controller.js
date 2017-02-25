(function() {
  'use strict';

  angular
  .module('events')
  .controller('EventController', EventController);

  /** @ngInject */
  function EventController($timeout, toastr, event) {
    var vm = this;

    vm.event = {};
    vm.dates = 1;
    vm.getNumber = getNumber;
    vm.addField = addField;

    activate();

    function activate() {
      
    }
    
    function addField() {
      vm.dates++;
    }
    
    function getNumber(num) {
      return new Array(num);   
    }

    
  }
})();
