'use strict';
module.exports = function(sequelize, DataTypes) {
  var Event = sequelize.define('Event', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    place: DataTypes.STRING
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

