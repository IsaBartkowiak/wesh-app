(function () {
   'use strict';

   angular
   .module('events')
   .factory('users', userService);
          
    function userService($resource){
          return $resource('http://localhost\:5000/api/users/', {}, {
                create: { method: 'POST', withCredentials: true},
                get: { method: 'GET', isArray: true, params:{id:'@id'} },
                getAll: { method: 'GET', isArray: true},
                delete: { method: 'DELETE', params:{id:'@id'} },
                update: { method: 'PUT', params:{id:'@id'}},
                login: { 
                  url: 'http://localhost\:5000/api/users/login/',
                  method: 'POST',
                  withCredentials: true
                },
                logout: { 
                  url: 'http://localhost\:5000/api/users/logout/',
                  method: 'GET',
                  withCredentials: true
                },
                loggedin: { 
                  url: 'http://localhost\:5000/api/users/loggedin/',
                  method: 'GET',
                  withCredentials: true}
            });
    }
})();