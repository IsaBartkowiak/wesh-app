'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.renameColumn('Event', 'name', 'title');
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.renameColumn('Event', 'title', 'name');
  }
};
