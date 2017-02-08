'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    login: DataTypes.STRING,
    name: DataTypes.STRING,
    lastname: DataTypes.STRING,
    biography: DataTypes.TEXT
  }, {
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Event, {as: 'managed_events'});
        User.belongsToMany(models.Event, {through: 'Participate', as: "participated_events"});
      }
    }
  });
  return User;
};

