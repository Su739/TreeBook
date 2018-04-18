'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Articles', ['parent'], {
      type: 'foreign key',
      name: 'article_book_fkey',
      references: {
        table: 'Books',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Articles',
      'article_book_fkey');
  }
};
