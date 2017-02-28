'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.renameColumn('User', 'login', 'email');
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.renameColumn('User', 'email', 'login');
  }
};
