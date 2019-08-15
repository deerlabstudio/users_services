'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    salt: DataTypes.STRING,
    password: DataTypes.STRING,
    avatar: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    usersTypesId: DataTypes.INTEGER,
    company: DataTypes.INTEGER
  }, {});
  Users.associate = function(models) {
    // associations can be defined here
    Users.belongsTo(models.UsersTypes, { foreignKey: { name:"usersTypesId", field: "usersTypesId", allowNull: true }});
  };
  Users.prototype.toJSON =  function () {
    var values = Object.assign({}, this.get());
    delete values.salt;
    delete values.password;
    return values;
  }
  return Users;
};
