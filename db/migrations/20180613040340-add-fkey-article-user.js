'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Articles', ['writer'], {
      type: 'foreign key',
      name: 'article_user_fkey',
      references: {
        table: 'Users',
        field: 'userName'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Articles',
      'article_user_fkey');
  }
};
