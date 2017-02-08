'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Occur', {
      EventId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'Event',
          key: 'id'}
      },
      SlotId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
            model: 'Slot',
            key: 'id'}
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Occur');
  }
};