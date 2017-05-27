(function() {
  'use strict';

  angular
  .module('events')
  .filter('relativeDate', relativeDate);

  /** @ngInject */
  function relativeDate(moment) {
    return function(date) {
      return moment(date).startOf("minute").fromNow();

    };
  }

})();
