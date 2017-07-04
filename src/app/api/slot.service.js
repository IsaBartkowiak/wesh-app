(function () {
   'use strict';

   angular
   .module('events')
   .factory('slot', slotService);
          
    function slotService($resource){
          return $resource('https://wesh-app.herokuapp.com/api/events/:id/slots/', {}, {
                create: { method: 'POST', params:{id:'@id'}},
                update: { method: 'PUT', params:{id:'@id'}}
            });
    }
})();
