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
		$rootScope.currentUser = {"id":2,"email":"pierrotl15@gmail.com","name":"Pierre","lastname":"Liaubet","biography":"Mangeur de PORC","createdAt":"2017-03-07T12:28:33.488Z","updatedAt":"2017-03-07T12:28:33.488Z"};
    });
  }

})();
