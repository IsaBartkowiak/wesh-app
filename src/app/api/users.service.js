(function () {
   'use strict';

   angular
   .module('events')
   .factory('users', userService);
          
    function userService($resource){
          return $resource('https://wesh-app.herokuapp.com/api/users/', {}, {
                create: { method: 'POST', withCredentials: true},
                get: { method: 'GET', isArray: true, params:{id:'@id'} },
                getAll: { method: 'GET', isArray: true},
                delete: { method: 'DELETE', params:{id:'@id'} },
                update: { 
                  method: 'PUT',
                  params:{id:'@id'},
                  url: 'https://wesh-app.herokuapp.com/api/users/:id'
                },
                login: { 
                  url: 'https://wesh-app.herokuapp.com/api/users/login/',
                  method: 'POST',
                  withCredentials: true
                },
                logout: { 
                  url: 'https://wesh-app.herokuapp.com/api/users/logout/',
                  method: 'GET',
                  withCredentials: true
                },
                loggedin: { 
                  url: 'https://wesh-app.herokuapp.com/api/users/loggedin/',
                  method: 'GET',
                  withCredentials: true}
            });
    }
})();