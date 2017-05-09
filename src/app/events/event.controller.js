(function() {
  'use strict';

  angular
  .module('events')
  .controller('EventController', EventController);

  /** @ngInject */
  function EventController($rootScope, toastr, event, slot) {
    var vm = this;
    $rootScope.context = "add";

    vm.event = {};
    vm.event.UserId = $rootScope.currentUser.id;
    vm.field = [];
    vm.fieldCount = 0;
    vm.dates = {};
    vm.geocode = "";
    vm.getNumber = getNumber;
    vm.addField = addField;
    vm.removeField = removeField;
    vm.addEvent = addEvent;
    
    init();

    function init() {
      event.getAll(function(data){
        vm.events = data;
      });
    }

    
    function addField() {
      var date = {};
      date.id = Math.floor((Math.random() * 100) + 2);
      if(vm.field.length < 5){
        vm.field.push(date);
        vm.fieldCount++;
      }
    }
    function removeField(field) {
      var index = vm.field.indexOf(field);
      vm.field.splice(index, 1);
      delete vm.dates[field.id];
    }
    
    function getNumber(num) {
      return new Array(num);   
    }
    
    function addEvent(form){
      if(form.$valid){
        event.create(vm.event, function(data){
          if(data.status == "success"){
            angular.forEach(vm.dates, function(value, key) {
              slot.create({id:data.id}, value, function(res) {
                console.log(res);
                if(res.status == "success"){
                  console.log('ok');
                }
              });
            });
            toastr.success('Votre évènement a bien été crée', 'Succès');
          }else{
            toastr.error('Une erreur est survenue', 'Oups');
          }
        });
      }
    }

    
  }
})();
