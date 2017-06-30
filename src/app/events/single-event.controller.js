(function() {
  'use strict';

  angular
  .module('events')
  .controller('SingleEventController', SingleEventController);

  /** @ngInject */
  function SingleEventController($rootScope, $mdDialog, $state, $document, $stateParams, notification, toastr, event, slot, participations) {
    var vm = this;
    vm.event = {};
    vm.addUserParticipation = addUserParticipation;
    vm.containsObject = containsObject;
    vm.removeUserParticipation = removeUserParticipation;
    vm.getIndexOf = getIndexOf;


    init();

    function init() {
      event.get({id: $stateParams.id}, function(data){
        vm.event = data;
      });
    }
    
    function addUserParticipation(slot){
      if(!vm.containsObject($rootScope.currentUser, slot.users)){
        var obj = {};
        obj.slotId = slot.id;
        obj.userId = $rootScope.currentUser.id;
        participations.create({id:vm.event.id}, obj, function(res) {
          if(res.status == "success"){
            slot.users.push($rootScope.currentUser);
            toastr.success('Participation enregistrée', 'Succès');
            //ajout d'une notification
            if(vm.event.owner.id != $rootScope.currentUser.id){
              var obj = {};
              obj.content = $rootScope.currentUser.name+" "+$rootScope.currentUser.lastname+" participe à votre évènement "+vm.event.title;
              obj.type = 2;
              obj.UserId = vm.event.owner.id;
              notification.create(obj);
            }
          }
        });
      }else{
        vm.removeUserParticipation(slot);
      } 
    }
    
    function removeUserParticipation(slot){
      participations.delete({id:slot.id, userid: $rootScope.currentUser.id}, function(res) {
        if(res.status == "success"){
          var index = vm.getIndexOf($rootScope.currentUser, slot.users);
          slot.users.splice(index, 1);
          toastr.success('Participation supprimée', 'Succès');
          var obj = {};
          obj.content = $rootScope.currentUser.name+" "+$rootScope.currentUser.lastname+" s'est désinscrit de votre évènement "+vm.event.title;
          obj.type = 3;
          obj.UserId = vm.event.owner.id;
          notification.create(obj);
        }
      });
    }
    
    function getIndexOf(obj, array){
      for (var i = 0; i < array.length; i++) {
        if (array[i].id === obj.id) {
          return i;
        }
      }
      return -1;
    }
    
    function containsObject(obj, array) {
      for (var i = 0; i < array.length; i++) {
        if (array[i].id === obj.id) {
          return true;
        }
      }
      return false;
    }
    
    
  }
})();
