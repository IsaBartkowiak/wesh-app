(function() {
  'use strict';

  angular
  .module('events')
  .controller('SingleEventController', SingleEventController);

  /** @ngInject */
  function SingleEventController($rootScope, $stateParams, toastr, event, slot) {
    var vm = this;
    vm.event = {};
    
    init();

    function init() {
      event.get({id: $stateParams.id}, function(data){
        vm.event = data;
        console.log(data);
      });
    }
 
  
}
})();
