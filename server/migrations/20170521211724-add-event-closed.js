'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Event',
      'closed',
      Sequelize.BOOLEAN
      )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Event', 'closed');
  }

  };
