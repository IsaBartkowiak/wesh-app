(function() {
  'use strict';

  angular
  .module('events')
  .filter('cleanDate', cleanDate);

  /** @ngInject */
  function cleanDate(moment) {
    return function(date) {
      return moment(date).format('DD MMMM YYYY');
    };
  }

})();
