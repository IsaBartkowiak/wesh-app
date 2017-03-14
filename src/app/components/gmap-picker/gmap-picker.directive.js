(function() {
  'use strict';

  angular
  .module('events')
  .directive('gmapPicker', gmapPicker);

  /** @ngInject */
  function gmapPicker() {
    var directive = {
      restrict: 'EA',
      templateUrl: 'app/components/gmap-picker/gmap-picker.html',
      controller: gMapPickerController,
      scope: {
      model: '='
      },
      controllerAs: 'gmap',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function gMapPickerController() {
      var vm = this;
      
    }
  }

})();
