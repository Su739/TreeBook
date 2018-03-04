'use strict';
const User = require('./user.js');
module.exports = (sequelize, DataTypes) => {
  var UserProfile = sequelize.define('UserProfile', {
    userId: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: User,
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    nickName: DataTypes.STRING,
    avatar: DataTypes.STRING,
    gender: DataTypes.STRING,
    profession: DataTypes.STRING,
    company: DataTypes.STRING
  }, {});
  UserProfile.belongsTo(User, 'user_profile_user_fkey');
  UserProfile.associate = function(models) {
    // associations can be defined here
  };
  return UserProfile;
};
