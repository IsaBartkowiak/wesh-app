(function() {
  'use strict';

  angular
  .module('events')
  .run(runBlock);

  /** @ngInject */
  function runBlock($log, $rootScope, $state, $timeout, users) {

    users.loggedin(function(user){
      $rootScope.currentUser = user;
    });
    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
      users.loggedin(function(data){
        if(data.user){
          $rootScope.currentUser = data.user;
        }else if(toState.name != "register"){
           $state.go('login');
        }
      });
      // $rootScope.currentUser = {
      //   name:"Isadora",
        
      // }
    });
  }

})();
