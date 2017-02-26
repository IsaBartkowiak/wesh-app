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
      scope: {
      bloctitle: '=',
      subtitle: '='
      },
      controllerAs: 'nav',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController($rootScope, $state, auth) {
      var vm = this;
      vm.currentState = $state.current.name;
      vm.user = $rootScope.currentUser;
    }
  }

})();
