(function() {
  'use strict';

  angular
  .module('events')
  .controller('EditEventController', EditEventController);

  /** @ngInject */
  function EditEventController($rootScope, $stateParams, $timeout, $mdDialog, $state, toastr, event, slot) {
    var vm = this;
    vm.event = {};
    vm.field = [];
    vm.updateEvent = updateEvent;
    vm.deleteEvent = deleteEvent;
    
    init();

    function init() {
      event.get({id: $stateParams.id}, function(data){
        vm.event = data; 
      });
    }

    
    //A l'enregistrement
    function updateEvent(form){
      if(form.$valid){
        event.update({id: $stateParams.id}, vm.event, function(data){
          if(data.status == "success"){
            angular.forEach(vm.dates, function(value) {
              slot.create({id:data.id}, value);
            });
            toastr.success('Votre évènement a bien été modifié', 'Succès');
            $timeout(function(){
              $state.go("singleevent", {"id":data.id});
            }, 500);
          }else{
            toastr.error('Une erreur est survenue', 'Oups');
          }
        });
      }
    }
    
     //Suppression
    function deleteEvent(ev){
      var confirm = $mdDialog.confirm()
      .title('Confirmer')
      .parent(angular.element(document.querySelector('#editevent')))
      .clickOutsideToClose(true)
      .textContent('Etes-vous sûr de vouloir supprimer cet évènement ?')
      .ariaLabel('confirm')
      .targetEvent(ev)
      .ok('Oui')
      .cancel('Annuler');

      $mdDialog.show(confirm).then(function() {
        event.delete({id: $stateParams.id}, function(data){
          if(data.status == "success"){
            toastr.success('Votre évènement a bien été supprimé', 'Succès');
            $state.go('home');
          }else{
            toastr.error('Une erreur est survenue', 'Oups');
          }
        });
      });
    }
    
  }
})();
