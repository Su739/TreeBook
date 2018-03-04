'use strict';
module.exports = (sequelize, DataTypes) => {
  var Role = sequelize.define('Role', {
    roleId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    roleName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        len: [1, 10],
        is: ['[a-zA-Z0-9_()]']
      }
    }
  }, {});
  Role.associate = function(models) {
    // associations can be defined here
  };
  return Role;
};
