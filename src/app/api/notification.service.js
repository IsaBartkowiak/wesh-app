(function () {
   'use strict';

   angular
   .module('events')
   .factory('notification', notificationService);
          
    function notificationService($resource){
          return $resource('https://wesh-app.herokuapp.com/api/notifications/', {}, {
                create: { method: 'POST' },
                get: { method: 'GET', params:{id:'@id'}, isArray: true, url: 'https://wesh-app.herokuapp.com/api/users/:id/notifications'},
                read: { method: 'PUT', params:{id:'@id'}, url: 'https://wesh-app.herokuapp.com/api/notifications/:id'}
            });
    }
})();

