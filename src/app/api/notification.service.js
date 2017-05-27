(function () {
   'use strict';

   angular
   .module('events')
   .factory('notification', notificationService);
          
    function notificationService($resource){
          return $resource('http://localhost\:5000/api/notifications/', {}, {
                create: { method: 'POST' },
                get: { method: 'GET', params:{id:'@id'}, isArray: true, url: 'http://localhost\:5000/api/users/:id/notifications'},
                read: { method: 'PUT', params:{id:'@id'}, url: 'http://localhost\:5000/api/notifications/:id'}
            });
    }
})();

