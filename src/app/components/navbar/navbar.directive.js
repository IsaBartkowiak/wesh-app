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
    function NavbarController($rootScope, $state, $sce, notification, auth) {
      var vm = this;
      vm.currentState = $state.current.name;
      vm.user = $rootScope.currentUser;
      vm.notifications = [];
      vm.notificationsCount = 0;
      vm.readNotif = readNotif;
      vm.notifPanel = false;
      vm.logout = logout;
      vm.sanitize = sanitize;
      
      init();

      function init() {
        vm.notificationsCount = 0;
        notification.get({id: vm.user.id}, function(data){
          vm.notifications = data;
          angular.forEach(vm.notifications, function(value, key) {
            if(value.seen == false){
              vm.notificationsCount++;
            }
          });
        });
      }
      
      
      function sanitize(string){
        return $sce.trustAsHtml(string);
      }  
      
      function readNotif(id){
        notification.read({id: id}, {}, function(data){
          if(data.status == 'success'){
            init();
          }
        });
      }
      
      function logout(){
        auth.logout();
        $state.go("login");
      }
      
    }
  }

})();
