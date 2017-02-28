(function () {
   'use strict';

   angular
   .module('events')
   .factory('slot', slotService);
          
    function slotService($resource){
          return $resource('http://localhost\:5000/api/events/:id/slots/', {}, {
                create: { method: 'POST', params:{id:'@id'}},
                update: { method: 'PUT', params:{id:'@id'}}
            });
    }
})();
