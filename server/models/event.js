'use strict';
module.exports = function(sequelize, DataTypes) {
  var Event = sequelize.define('Event', {
    title: {
        allowNull: false,
        type: DataTypes.STRING
      },
    description: DataTypes.STRING,
    place: DataTypes.STRING,
    closed: DataTypes.BOOLEAN
  }, {
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        Event.belongsTo(models.User, {
          onDelete: "CASCADE",
          as: "owner", 
          foreignKey: "UserId"
        });
        Event.belongsToMany(models.Slot, {through: 'Occur', as: "slots"});
      }
    }
  });
  return Event;
};

