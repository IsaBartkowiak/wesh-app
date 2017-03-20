(function () {
   'use strict';

   angular
   .module('events')
   .factory('participations', participationsService);
          
    function participationsService($resource){
          return $resource('http://localhost\:5000/api/events/:id/participations/', {}, {
                create: { method: 'POST', params:{id:'@id'}},
                update: { method: 'PUT', params:{id:'@id', userid: '@userid'}},
                delete: { method: 'DELETE', params:{id:'@id', userid: '@userid'}, url: 'http://localhost\:5000/api/participations/:id/user/:userid' }
            });
    }
})();
