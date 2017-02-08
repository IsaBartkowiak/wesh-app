'use strict';
module.exports = function(sequelize, DataTypes) {
  var Participate = sequelize.define('Participate', {
    EventId: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    SlotId: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    UserId: {
        type: DataTypes.INTEGER,
        primaryKey: true
    }
  }, {
    freezeTableName: true,
    timestamps: false,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Participate;
};