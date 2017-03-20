(function() {
	'use strict';

	angular
		.module('events')
		.controller('ProfileCtrl', ProfileCtrl);

	/** @ngInject */
	function ProfileCtrl($rootScope,$scope, $timeout, toastr, event, moment, users) {

		$rootScope.context = "updateUser";

		$scope.user = $rootScope.currentUser;
		$scope.newPassword = "";
		$scope.confirmNewPassword = "";
		$scope.saveChanges = saveChanges;

		function saveChanges(){
			if ($scope.newPassword != ""){
				if ($scope.newPassword != $scope.confirmNewPassword){
					$scope.user.password = $scope.newPassword;
				}
			}
		}

	}
})();
