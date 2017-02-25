(function() {
  'use strict';

  angular
  .module('events')
  .directive('navbar', navbar);

  /** @ngInject */
  function navbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController($rootScope, auth) {
      var vm = this;
      vm.user = null;
      
      auth.getUser(function(user){
        vm.user = user;
        console.log(user);
      });
    }
  }

})();
