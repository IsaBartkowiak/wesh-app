(function() {
  'use strict';

  angular
    .module('events')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, toastr, event, moment) {
    var vm = this;

    vm.events = {};
    vm.data = moment;

    activate();

    function activate() {
      event.getAll(function(data){
        vm.events = data;
      });
    }

   
  }
})();
