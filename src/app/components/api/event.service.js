(function () {
   'use strict';

   angular
   .module('banque')
   .factory('event', eventService);
          
    function eventService($resource){
          return $resource('http://localhost\:5000/api/events/', {}, {
                create: { method: 'POST' },
                get: { method: 'GET', isArray: true, params:{id:'@id'} },
                getAll: { method: 'GET', isArray: true},
                delete: { method: 'DELETE', params:{id:'@id'} },
                update: { method: 'PUT', params:{id:'@id'}}
            });
    }
})();
