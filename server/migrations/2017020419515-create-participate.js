'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Participate', {
      EventId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Event',
          key: 'id'}
      },
      SlotId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Slot',
          key: 'id'}
      },
      UserId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'User',
          key: 'id'}
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Participate');
  }
};