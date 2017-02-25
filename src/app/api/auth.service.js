(function () {
 'use strict';

 angular
 .module('events')
 .factory('auth', authService);
 
 function authService($resource, $q, users){
  var currentUser = {};
  
    function getUser(){
      return currentUser;
    }
  
    //Vérification qu'il y a un utilisateur connecté
    function isLoggedIn() {
      if(currentUser) {
        return true;
      } else {
        return false;
      }
    }
    
    //création de compte puis connexion automatique
    function register(user){
      var deferred = $q.defer();
     users.create({
      login: user.login,
      password: user.password,
      name: user.name,
      lastname: user.lastname,
      biography: user.bio
    },
    function(user) {
      currentUser = user;
      deferred.resolve();
    }, 
    function(error) {
      deferred.reject(error);
    });
     return deferred.promise;
   }
   
    //connexion d'un utilisateur
    function login(login, password){
      var deferred = $q.defer();
      users.login({
        login: login,
        password : password
      },
      function(user){
        currentUser = user;
        deferred.resolve();
      },
      function(){
        deferred.reject();
      });
      return deferred.promise;
    }
    
    //déconnexion de l'utilisateur
    function logout(){
      users.logout();
      currentUser = false;
    }
    
    return ({
      currentUser : currentUser,
      isLoggedIn: isLoggedIn,
      login: login,
      register: register,
      getUser : getUser,
      logout: logout
    });
  }
})();
