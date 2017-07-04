(function () {
   'use strict';

   angular
   .module('events')
   .factory('participations', participationsService);
          
    function participationsService($resource){
          return $resource('https://wesh-app.herokuapp.com/api/events/:id/participations/', {}, {
                create: { method: 'POST', params:{id:'@id'}},
                update: { method: 'PUT', params:{id:'@id', userid: '@userid'}},
                delete: { method: 'DELETE', params:{id:'@id', userid: '@userid'}, url: 'https://wesh-app.herokuapp.com/api/participations/:id/user/:userid' }
            });
    }
})();
