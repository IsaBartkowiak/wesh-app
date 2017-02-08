(function() {
  'use strict';

  angular
    .module('banque')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
