(function() {
  'use strict';

  angular
  .module('events')
  .controller('SingleEventController', SingleEventController);

  /** @ngInject */
  function SingleEventController($rootScope, $mdDialog, $state, $document, $stateParams, notification, toastr, event, slot, participations) {
    var vm = this;
    vm.event = {};
    vm.containsObject = containsObject;
    vm.getIndexOf = getIndexOf;


    init();

    function init() {
      event.get({id: $stateParams.id}, function(data){
        vm.event = data;
      });
    }
    
    
    function getIndexOf(obj, array){
      for (var i = 0; i < array.length; i++) {
        if (array[i].id === obj.id) {
          return i;
        }
      }
      return -1;
    }
    
    function containsObject(obj, array) {
      for (var i = 0; i < array.length; i++) {
        if (array[i].id === obj.id) {
          return true;
        }
      }
      return false;
    }
    
    
  }
})();
