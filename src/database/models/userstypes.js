'use strict';
module.exports = (sequelize, DataTypes) => {
  const UsersTypes = sequelize.define('UsersTypes', {
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  UsersTypes.associate = function(models) {
    // associations can be defined here
    UsersTypes.hasMany(models.Users, {
      foreignKey: {
        name:"usersTypesId",
        field: "usersTypesId",
        allowNull: true
      }
    });
  };
  return UsersTypes;
};
