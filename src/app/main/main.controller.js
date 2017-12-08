(function() {
  'use strict';

  angular
  .module('events')
  .controller('MainController', MainController);

  /** @ngInject */
  function MainController($rootScope, $timeout, $scope, $document, toastr, event, moment, users, participations) {
    var vm = this;
    $rootScope.bodyClass = "app";
    $rootScope.context = "main";
    
    vm.events = [];
    vm.data = moment;
    vm.filter = {};
    vm.activeTab = "all";
    vm.containsObject = containsObject;
    vm.getIndexOf = getIndexOf;
    vm.showAll = showAll;
    vm.showUser = showUser;
    vm.showDone = showDone;

    activate();

    function activate() {
      event.getAll(function(data){
        vm.events = data;
      });
    }
    
    function showAll(){
      vm.filter = '';
      vm.activeTab = "all";
    }
    
    function showUser(){
      vm.filter = {"owner":{"id":$rootScope.currentUser.id}};
      vm.activeTab = "user";
    }

    function showDone(){
      vm.filter = {closed:true};
      vm.activeTab = "done";
    }
    
    function containsObject(obj, array) {
      for (var i = 0; i < array.length; i++) {
        if (array[i].id === obj.id) {
          return true;
        }
      }
      return false;
    }
    
    function getIndexOf(obj, array){
      for (var i = 0; i < array.length; i++) {
        if (array[i].id === obj.id) {
          return i;
        }
      }
      return -1;
    }

    
  }
})();
