(function() {
  'use strict';

  angular
  .module('events')
  .controller('CloseEventController', CloseEventController);

  /** @ngInject */
  function CloseEventController($rootScope, $stateParams, $state, $mdDialog, notification, toastr, event) {
    var vm = this;
    vm.event = {};
    vm.selection = {};
    vm.recommandation = false;
    vm.changeSelection = changeSelection;
    vm.closeEvent = closeEvent;
    vm.showHelp = false;
    vm.notifyUsers = notifyUsers;
    
    init();

    function init() {
      event.get({id: $stateParams.id}, function(data){
        vm.event = data;
      });
    }
    
    function changeSelection(id){
      vm.selection = {};
      vm.selection[id] = true;
    }
    
    function closeEvent(ev){

      var modal = $mdDialog.confirm()
      .title('Confirmer')
      .parent(angular.element(document.querySelector('#closevent')))
      .clickOutsideToClose(true)
      .textContent('Etes-vous sûr de vouloir cloturer cet évènement ?')
      .ariaLabel('confirm')
      .targetEvent(ev)
      .ok('Oui')
      .cancel('Annuler');
      
      $mdDialog.show(modal).then(function() {
        var obj = {id: Object.keys(vm.selection)[0]};
        event.close({id: $stateParams.id}, obj, function(data){
          if(data.status == "success"){
            toastr.success('Votre évènement a bien été cloturé', 'Succès');
            vm.notifyUsers();
            $state.go("singleevent", {"id":$stateParams.id});
          }else{
            toastr.error('Une erreur est survenue', 'Oups');
          }
        });
      });
    }
    
    
    function notifyUsers(){
      angular.forEach(vm.event.slots, function(slot) {
        if(slot.users.length > 0){
          angular.forEach(slot.users, function(user) {
          var obj = {};
          obj.content = "L'évènement "+vm.event.title+" auquel vous avez participé a été cloturé !";
          obj.type = 1;
          obj.UserId = user.id;
          notification.create(obj);
        });
        }
      });
    }
    
    
  }
})();
