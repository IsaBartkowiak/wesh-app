(function() {
  'use strict';

  angular
  .module('events')
  .directive('compareTo', compareTo);

  /** @ngInject */
  function compareTo() {
    var directive = {
      restrict: 'A',
      require: "ngModel",
      link: CompareTo,
      scope: {
        otherModelValue: "=compareTo"
    }
};

return directive;

/** @ngInject */
function CompareTo($scope, element, attributes, ngModel) {
    
    ngModel.$validators.compareTo = function(modelValue) {
        return (modelValue == $scope.otherModelValue);
    };  
    ngModel.$validate();  
    $scope.$watch("otherModelValue", function() {
        ngModel.$validate();
    });
}//fin CompareTo


}//fin compareTo

})();
