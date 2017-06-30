(function() {
	'use strict';

	angular
	.module('events')
	.controller('ProfileCtrl', ProfileCtrl);

	/** @ngInject */
	function ProfileCtrl($rootScope,$scope, $timeout, toastr, event, moment, users) {

		$rootScope.context = "updateUser";
		var vm = this;
		vm.user = $rootScope.currentUser;
		vm.user.newPassword = "";
		vm.user.confirmNewPassword = "";
		vm.saveChanges = saveChanges;

		function saveChanges(form){
			console.log(form.$valid);
			if(form.$valid){
				users.update({id: vm.user.id}, vm.user, function(data){
					console.log(data);
					if(data.status == 'success'){
						toastr.success('Votre compte a bien été modifié', 'Succès');
					}else{
						toastr.error('Une erreur est survenue', 'Oups');	
					}
				});
			}
		}

	}
})();