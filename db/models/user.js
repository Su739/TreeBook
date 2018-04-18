'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    userName: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        len: [1, 10],
        is: ['[a-zA-Z0-9_]']
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    emailConfirmed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false
    },
    securityStamp: {
      type: DataTypes.STRING
    },
    concurrencyStamp: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
