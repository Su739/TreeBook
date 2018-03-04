'use strict';
module.exports = (sequelize, DataTypes) => {
  var RoleUser = sequelize.define('RoleUser', {
    roleID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userID: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    }
  }, {});
  RoleUser.associate = function(models) {
    // associations can be defined here
  };
  return RoleUser;
};
