'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Slot', 'hour');
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Slot',
      'hour',
      Sequelize.TIME
      );
  }
};
