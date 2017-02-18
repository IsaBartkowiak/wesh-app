'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'User',
      'login',
      {
        type: Sequelize.STRING,
        validate: {
          isEmail: true
        }
      }
      );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'User',
      'login',
      {
        type: Sequelize.STRING
      }
      );
  }
};
