'use strict';
const User = require('./user.js');
const Role = require('./role.js');
module.exports = (sequelize, DataTypes) => {
  var RoleUser = sequelize.define('RoleUser', {
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: Role,
        key: 'roleId'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: User,
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    }
  }, {});
  RoleUser.associate = function(models) {
    // associations can be defined here
  };
  return RoleUser;
};
