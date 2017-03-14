(function() {
  'use strict';

  angular
  .module('events')
  .filter('cleanDate', cleanDate);

  /** @ngInject */
  function cleanDate(moment) {
    return function(date, format) {
      return moment(date).format(format);
    };
  }

})();
