'use strict';
module.exports = function(sequelize, DataTypes) {
  var Occur = sequelize.define('Occur', {
    EventId: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    SlotId: {
        type: DataTypes.INTEGER,
        primaryKey: true
    }
  }, {
    freezeTableName: true,
    timestamps: false,
    classMethods: {
      associate: function(models) {
      }
    }
  });
  return Occur;
};