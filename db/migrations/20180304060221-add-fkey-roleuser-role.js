'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('RoleUsers', ['roleId'], {
      type: 'foreign key',
      name: 'roleuser_role_fkey',
      references: {
        table: 'Roles',
        field: 'roleId'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('RoleUsers',
      'roleuser_role_fkey');
  }
};
