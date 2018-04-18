'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Books', ['writerId'], {
      type: 'foreign key',
      name: 'book_user_fkey',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Books',
      'book_user_fkey');
  }
};
