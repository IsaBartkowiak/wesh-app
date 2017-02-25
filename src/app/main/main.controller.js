(function() {
  'use strict';

  angular
    .module('events')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, toastr, event, moment, users) {
    var vm = this;

    vm.events = {};
    vm.data = moment;
    vm.test = test;
    
    function test(){
      console.log('test');
      // users.loggedin(function(user){
      //   console.log(user);
      // });
    }

    activate();

    function activate() {
      event.getAll(function(data){
        vm.events = data;
      });
    }

   
  }
})();
