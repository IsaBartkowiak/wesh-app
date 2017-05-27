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
    vm.dates = [];
    vm.fieldCount = 0;
    vm.removeField = removeField;
    vm.addField = addField;
    vm.updateEvent = updateEvent;
    
    init();

    function init() {
      event.get({id: $stateParams.id}, function(data){
        vm.event = data; 
        angular.forEach(data.slots, function(value, key) {
          vm.dates[key] = {};
          vm.dates[key].date = value.date.toString();
          if(key > 0){
            vm.field.push({id:key}); 
          }
        });
        vm.fieldCount = vm.dates.length;
      });
    }
    
    //ajoute un champ date (clic du +)
    function addField() {
      var field = {};
      field.id = vm.fieldCount;
      if(vm.field.length < 5){
        vm.field.push(field);
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
    
  }
})();
