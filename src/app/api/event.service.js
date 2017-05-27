(function () {
   'use strict';

   angular
   .module('events')
   .factory('event', eventService);
          
    function eventService($resource){
          return $resource('http://localhost\:5000/api/events/', {}, {
                create: { method: 'POST' },
                get: { method: 'GET', params:{id:'@id'}, url: 'http://localhost\:5000/api/events/:id'},
                getAll: { method: 'GET', isArray: true},
                delete: { method: 'DELETE', params:{id:'@id'}, url: 'http://localhost\:5000/api/events/:id'},
                update: { method: 'PUT', params:{id:'@id'}, url: 'http://localhost\:5000/api/events/:id'},
                close: { method: 'PUT', params:{id:'@id'}, url: 'http://localhost\:5000/api/events/:id/close/'}
            });
    }
})();

