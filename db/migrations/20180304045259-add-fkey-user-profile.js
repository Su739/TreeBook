'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('UserProfiles', ['userId'], {
      type: 'foreign key',
      name: 'user_profile_user_fkey',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('UserProfiles',
      'user_profile_user_fkey');
  }
};
