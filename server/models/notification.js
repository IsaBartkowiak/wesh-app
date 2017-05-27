'use strict';
module.exports = function(sequelize, DataTypes) {
  var Notification = sequelize.define('Notification', {
    content: DataTypes.STRING,
    type: DataTypes.INTEGER,
    seen: DataTypes.BOOLEAN
  }, {
        freezeTableName: true,

    classMethods: {
      associate: function(models) {
        Notification.belongsTo(models.User, {
          onDelete: "CASCADE",
          as: "user", 
          foreignKey: "UserId"
        });
      }
    }
  });
  return Notification;
};