(function() {
  'use strict';

  angular
  .module('events')
  .filter('myParticipation', myParticipation);

  /** @ngInject */
  function myParticipation($rootScope) {
    return function(items) {
      var filtered = [];
      if(items.length){
        angular.forEach(items, function(ev) {
          angular.forEach(ev.slots, function(slot) {
            angular.forEach(slot.users, function(user) {
              if(user.id == $rootScope.currentUser.id && filtered.indexOf(ev) == -1) {
                filtered.push(ev);
              }
            });
          });
        });
      }
      
      return filtered;
    };
  }

})();
