'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('RoleUsers', ['userId'], {
      type: 'foreign key',
      name: 'roleuser_user_fkey',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('RoleUsers',
      'roleuser_user_fkey');
  }
};
