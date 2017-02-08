'use strict';
module.exports = function(sequelize, DataTypes) {
  var Slot = sequelize.define('Slot', {
    date: DataTypes.DATE,
    hour: DataTypes.TIME,
    choosen: DataTypes.BOOLEAN
  }, {
    freezeTableName: true,
    timestamps: false,
    classMethods: {
      associate: function(models) {
        Slot.belongsToMany(models.Event, {through: 'Occur'});
        Slot.belongsToMany(models.User, {through: 'Participate', as: "users"});
      }
    }
  });
  return Slot;
};