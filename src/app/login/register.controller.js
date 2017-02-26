(function() {
  'use strict';

  angular
  .module('events')
  .controller('RegisterController', RegisterController);

  /** @ngInject */
  function RegisterController($rootScope, $state, toastr, users, auth) {
    var vm = this;
    $rootScope.bodyClass = "connexion";

    vm.user = {};
    vm.createAccount = createAccount;

    function createAccount() {
      auth.register(vm.user)
      .then(function(){
        $state.go('home');
        toastr.success('Bienvenue wesh :)', 'Ola!');
      })
      .catch(function(){
        toastr.error('Une erreur est survenue', 'Oups');
      });
    }

    
  }
})();
