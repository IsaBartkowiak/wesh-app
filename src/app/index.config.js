(function() {
  'use strict';

  angular
    .module('events')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig, $mdDateLocaleProvider, moment) {
    // Enable log
    $logProvider.debugEnabled(true);
    
    moment.locale('fr');


    //Set les options des toasts
    toastrConfig.timeOut = 3000;
    toastrConfig.showDuration= 1000;
    toastrConfig.positionClass = 'toast-bottom-right';
    toastrConfig.newestOnTop =  true;

    
    //Set les options des input calendrier
    // $mdDateLocaleProvider.months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
    // $mdDateLocaleProvider.shortMonths = ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jun', 'Jui', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
    // $mdDateLocaleProvider.days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
    // $mdDateLocaleProvider.shortDays = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
    // $mdDateLocaleProvider.firstDayOfWeek = 1;
    // $mdDateLocaleProvider.formatDate = function(date) {
    //   var m = moment(date);
    //   return m.isValid() ? m.format('L') : '';
    // };
    
  }
})();
