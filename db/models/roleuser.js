'use strict';
module.exports = (sequelize, DataTypes) => {
  var RoleUser = sequelize.define('RoleUser', {
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userId: {
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
