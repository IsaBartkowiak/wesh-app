(function () {
   'use strict';

   angular
   .module('events')
   .factory('event', eventService);
          
    function eventService($resource){
          return $resource('https://wesh-app.herokuapp.com/api/events/', {}, {
                create: { method: 'POST' },
                get: { method: 'GET', params:{id:'@id'}, url: 'https://wesh-app.herokuapp.com/api/events/:id'},
                getAll: { method: 'GET', isArray: true},
                delete: { method: 'DELETE', params:{id:'@id'}, url: 'https://wesh-app.herokuapp.com/api/events/:id'},
                update: { method: 'PUT', params:{id:'@id'}, url: 'https://wesh-app.herokuapp.com/api/events/:id'},
                close: { method: 'PUT', params:{id:'@id'}, url: 'https://wesh-app.herokuapp.com/api/events/:id/close/'}
            });
    }
})();

