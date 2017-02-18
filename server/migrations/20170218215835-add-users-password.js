'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'User',
      'password',
      Sequelize.STRING
      )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('User', 'password');
  }

  };
