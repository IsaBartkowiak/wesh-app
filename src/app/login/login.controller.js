(function() {
  'use strict';

  angular
  .module('events')
  .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($state, $rootScope, toastr, users, auth) {
    var vm = this;
    $rootScope.bodyClass = "connexion";

    vm.email = "";
    vm.password = "";
    vm.authentificate = authentificate;

    function authentificate() {
      auth.login(vm.email, vm.password)
      .then(function () {
        toastr.success('Connexion réussie !', 'Succès');
        $state.go("home");
      })
      .catch(function () {
        toastr.error('E-mail ou mot de passe invalide', 'Erreur');
      });
   
    }
    
  }
})();
