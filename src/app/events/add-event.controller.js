(function() {
  'use strict';

  angular
  .module('events')
  .controller('EventController', EventController);

  /** @ngInject */
  function EventController($rootScope, $state, $timeout, toastr, event, slot) {
    var vm = this;
    $rootScope.context = "add";

    vm.event = {};
    vm.event.UserId = $rootScope.currentUser.id;
    vm.field = [];
    vm.fieldCount = 1;
    vm.dates = {};
    vm.addField = addField;
    vm.removeField = removeField;
    vm.addEvent = addEvent;

    //ajoute un champ date (clic du +)
    function addField() {
      var date = {};
      date.id = vm.fieldCount;
      if(vm.field.length < 5){
        vm.field.push(date);
        vm.fieldCount++;
      }
    }
    
    //retire le champ date cliqué
    function removeField(field) {
      var index = vm.field.indexOf(field);
      vm.field.splice(index, 1);
      delete vm.dates[field.id];
    }
    
    //A l'enregistrement
    function addEvent(form){
      if(form.$valid){
        event.create(vm.event, function(data){
          if(data.status == "success"){
            angular.forEach(vm.dates, function(value) {
              slot.create({id:data.id}, value);
            });
            $timeout(function(){
              toastr.success('Votre évènement a bien été crée', 'Succès');
              $state.go("singleevent", {"id":data.id});
            }, 500);

          }else{
            toastr.error('Une erreur est survenue', 'Oups');
          }
        });
      }
    }

    
  }
})();
