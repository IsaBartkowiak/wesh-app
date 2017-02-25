(function() {
  'use strict';

  angular
  .module('events')
  .run(runBlock);

  /** @ngInject */
  function runBlock($log, $rootScope, $timeout, users) {

    users.loggedin(function(user){
      $rootScope.currentUser = user;
    });
    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
      users.loggedin(function(user){
        $rootScope.currentUser = user;
      });
    });
  }

})();
