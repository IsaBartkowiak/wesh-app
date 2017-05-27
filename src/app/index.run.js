(function() {
  'use strict';

  angular
  .module('events')
  .run(runBlock);

  /** @ngInject */
  function runBlock($log, $rootScope, $state, $timeout, users) {

    //users.loggedin(function(user){
      //$rootScope.currentUser = user;
    //});
    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
      // users.loggedin(function(data){
      //   if(data.user){
      //     $rootScope.currentUser = data.user;
      //   }else if(toState.name != "register"){
      //      $state.go('login');
      //   }
      // });
      $rootScope.currentUser = {
        "id": 3,
        "email": "isadora",
        "name": "Isadora2",
        "lastname": "Bartkowiak",
        "biography": "dsjmosdv de la merde",
        "createdAt": "2017-02-04T23:25:34.882Z",
        "updatedAt": "2017-02-04T23:25:34.882Z"
      };
      
      // $rootScope.currentUser = {
      //   "id": 26,
      //   "email": "pierre@mail.com",
      //   "name": "Pierre26",
      //   "lastname": "Bartkowiak",
      //   "biography": "dsjmosdv de la merde",
      //   "createdAt": "2017-02-04T23:25:34.882Z",
      //   "updatedAt": "2017-02-04T23:25:34.882Z"
      // };
    });
  }

})();
